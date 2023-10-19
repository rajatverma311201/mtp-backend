const HttpStatus = require('http-status');
const { STATUS } = require('../utils/constants');

exports.getStocks = async (req, res) => {
  try {
    const query = req.query;
    const queryString = query.q;

    const data = await fetch(
      `https://groww.in/v1/api/search/v1/entity?app=false&page=0&q=${queryString}&entity_type=stocks&size=10`
    );

    if (!data.ok) {
      throw new Error('Something went wrong. failed to fetch!');
    }

    const content = (await data.json()).content || [];

    res.status(HttpStatus.OK).json({
      status: STATUS.SUCCESS,
      content: content,
    });
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: STATUS.FAIL,
      message: err.message,
    });
  }
};

exports.getStockDetails = async (req, res) => {
  try {
    const searchId = req.params.searchId;

    const data = await fetch(
      `https://groww.in/v1/api/stocks_data/v1/company/search_id/${searchId}`
    );
    if (!data.ok) {
      throw new Error('Something went wrong. failed to fetch!');
    }

    const stockData = await data.json();

    res.status(HttpStatus.OK).json({
      status: STATUS.SUCCESS,
      data: stockData,
    });
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: STATUS.FAIL,
      message: err.message,
    });
  }
};

exports.getStockChartData = async (req, res) => {
  try {
    const params = req.params;
    const query = req.query;
    const exchange = params.exchange;
    const scripCode = params.scripCode;
    const duration = params.duration;
    const interval = query.interval;

    const url = `https://groww.in/v1/api/charting_service/v2/chart/exchange/${exchange}/segment/CASH/${scripCode}/${duration}?intervalInDays=${interval}&intervalInMinutes=${interval}`;

    console.log(url);
    const data = await fetch(
      `https://groww.in/v1/api/charting_service/v2/chart/exchange/${exchange}/segment/CASH/${scripCode}/${duration}?intervalInDays=${interval}&intervalInMinutes=${interval}`
    );
    if (!data.ok) {
      throw new Error('Something went wrong. failed to fetch!');
    }

    const stockData = await data.json();

    res.status(HttpStatus.OK).json({
      status: STATUS.SUCCESS,
      data: stockData,
    });
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: STATUS.FAIL,
      message: err.message,
    });
  }
};
