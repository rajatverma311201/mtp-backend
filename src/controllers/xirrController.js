const XirrRepo = require('../repositories/XirrRepo');

module.exports = {
  async getAllInvestements(req, res) {
    try {
      const { rows: investments } = await XirrRepo.findByUserId(1);

      res.status(200).json({
        status: 'success',
        results: investments.length,
        data: investments,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  },
};
