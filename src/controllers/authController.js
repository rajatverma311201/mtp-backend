const UserRepo = require('../repositories/UserRepo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const HttpStatus = require('http-status');
const validator = require('validator');

const { MESSAGE, STATUS } = require('../utils/constants');
const { STATUS_CODES } = require('http');
const { nextTick } = require('process');

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  user.password = undefined;

  const currDate = Date.now();
  const finalDate =
    currDate + parseInt(process.env.JWT_EXPIRE) * 24 * 60 * 60 * 1000;

  res.status(statusCode).json({
    status: STATUS.SUCCESS,
    token,
    data: user,
    jwtExpire: finalDate,
  });
};

const signToken = (id) => {
  return jwt.sign({ id: id, iat: Date.now() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.protect = async (req, res, next) => {
  try {
    // 1)getting token and check if its there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: STATUS.FAIL,
        message: MESSAGE.LOGIN,
      });
    }

    // 2)Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3)Check if user still exists
    // decoded is the payload we passed while signing the jwt token
    const currentUser = await UserRepo.findById(decoded.id);

    if (!currentUser) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: STATUS.FAIL,
        message: MESSAGE.NO_USER,
      });
    }

    // 4) Check if user changed password after the token was issued
    if (changedPasswordAfter(decoded.iat, currentUser.password_changed_at)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: STATUS.FAIL,
        message: MESSAGE.PASSWORD_CHANGED,
      });
    }

    // 5) Grant access
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      status: STATUS.FAIL,
      message: error,
    });
  }
};

exports.signup = async (req, res, next) => {
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    password,
    mobile,
  } = req.body;

  const hashPassword = bcrypt.hashSync(password);

  await UserRepo.create({
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: email.trim(),
    password: hashPassword,
    mobile: mobile.trim(),
    password_changed_at: Date.now(),
  });

  const rows = await UserRepo.find({ email });
  const [newUser] = rows;

  createSendToken(newUser, HttpStatus.CREATED, res);
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);
    const rows = await UserRepo.find({ email });

    const [user] = rows;
    console.log(rows);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: STATUS.FAIL,
        message: MESSAGE.INVALID_CREDENTIALS,
      });
    }

    createSendToken(user, HttpStatus.OK, res);
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: STATUS.FAIL,
      message: error,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status: STATUS.FAIL,
        message: MESSAGE.NO_PERMISSION,
      });
    }
    next();
  };
};

exports.validateSignupRequest = async (req, res, next) => {
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    password,
    mobile,
  } = req.body;

  const fullName = first_name + last_name;
  let message = '';

  if (validator.isEmpty(fullName)) {
    message += 'Name must not be Empty!\n';
  }

  if (!validator.isAlpha(fullName)) {
    message += 'Name Should Only contain Letters!\n';
  }

  if (!validator.isEmail(email)) {
    message += 'Email Invalid!\n';
  }

  if (!validator.isStrongPassword(password)) {
    message += 'Weak Password!\n';
  }

  const regexp = new RegExp('^[1-9]\\d{9}$');
  if (!regexp.test(mobile)) {
    message += 'Mobile Number Invalid!\n';
  }

  if (message) {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: STATUS.FAIL,
      message,
    });
  }

  const emailExist = await UserRepo.find({ email });
  const mobileExist = await UserRepo.find({ mobile });

  if (emailExist.length || mobileExist.length) {
    return res.status(HttpStatus.CONFLICT).json({
      status: STATUS.FAIL,
      message: 'User Already Exists!',
    });
  }

  next();
};

exports.validateLoginRequest = async (req, res, next) => {
  const { email, password } = req.body;

  let message = '';

  if (!email || !password) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: STATUS.FAIL,
      message: MESSAGE.ENTER_CREDENTIALS,
    });
  }

  if (!validator.isEmail(email)) {
    message += 'Email Invalid!\n';
  }

  if (message) {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: STATUS.FAIL,
      message,
    });
  }

  next();
};

changedPasswordAfter = (jwtIssuedAt, passwordChangedAt) => {
  if (jwtIssuedAt < passwordChangedAt) {
    return true;
  }
  return false;
};
