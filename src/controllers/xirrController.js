const HttpStatus = require('http-status');
const XirrRepo = require('../repositories/XirrRepo');
const { STATUS } = require('../utils/constants');

module.exports = {
  async getAllInvestements(req, res) {
    try {
      const investments = await XirrRepo.findByUserId(req.user.id);

      res.status(HttpStatus.OK).json({
        status: STATUS.SUCCESS,
        results: investments.length,
        data: investments,
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: STATUS.FAIL,
        message: err,
      });
    }
  },

  async addInvestment(req, res) {
    try {
      const userId = req.user.id;
      const date = req.body.date;
      const amount = req.body.amount;

      await XirrRepo.create({ userId, date, amount });

      res.status(HttpStatus.CREATED).json({
        status: STATUS.SUCCESS,
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: STATUS.FAIL,
        message: err,
      });
    }
  },

  async deleteInvestment(req, res) {
    try {
      const userId = req.user.id;
      const date = req.body.date;

      console.log(date);

      await XirrRepo.delete({
        user_id: userId,
        date: `'${date}'`,
      });

      res.status(HttpStatus.OK).json({
        status: STATUS.SUCCESS,
      });
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).json({
        status: STATUS.FAIL,
        message: err,
      });
    }
  },
};
