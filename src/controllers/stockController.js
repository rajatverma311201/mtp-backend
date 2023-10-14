const HttpStatus = require('http-status');
const { STATUS } = require('../utils/constants');

exports.getStocks = async (req, res) => {
  try {
    const queryString = req.query.q;

    const data = await fetch(
      `https://groww.in/v1/api/search/v1/entity?app=false&page=0&q=${queryString}&seg=CFJmyH3759&size=10`
    );

    if (!data.ok) {
      throw new Error('Something went wrong. failed to fetch!');
    }

    const content = (await data.json()).content;

    res.status(HttpStatus.OK).json({
      status: STATUS.SUCCESS,
      content: content || [],
    });
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: STATUS.FAIL,
      message: err.message,
    });
  }
};
