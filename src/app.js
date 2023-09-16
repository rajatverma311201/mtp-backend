const express = require('express');
const userRouter = require('./routes/userRoutes');
const xirrRouter = require('./routes/xirrRoutes');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  const url = `${req.protocol}://${req.get('host')}/me`;
  console.log(url);
  res.send('Hello World');
});

app.use('/api/users', userRouter);
app.use('/api/xirrs', xirrRouter);
app.use('/api/auth', authRouter);

module.exports = app;
