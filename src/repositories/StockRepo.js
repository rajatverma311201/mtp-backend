const db = require('../db');
const { TABLE } = require('../utils/constants');
const Repository = require('./Repository');

class StockRepo extends Repository {
  constructor(tableName) {
    super(tableName);
  }
}

module.exports = new StockRepo(TABLE.STOCKS);
