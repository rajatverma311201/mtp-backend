const HttpStatus = require('http-status');
const XirrRepo = require('../repositories/XirrRepo');
const { STATUS } = require('../utils/constants');

module.exports = {
  async getAllInvestements(req, res) {
    try {
      const { rows: investments } = await XirrRepo.findByUserId(1);

      res.status(HttpStatus.OK).json({
        status: STATUS.SUCCESS,
        results: investments.length,
        data: investments,
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
