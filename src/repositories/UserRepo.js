const db = require("../db");
const { TABLE } = require("../utils/constants");
const Repository = require("./Repository");

class UserRepo extends Repository {
  constructor(tableName) {
    super(tableName);
  }
}

module.exports = new UserRepo(TABLE.USERS);
