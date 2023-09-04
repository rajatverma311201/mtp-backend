const db = require("../db");

class UserRepo {
  static async find() {
    return db.query("SELECT * FROM users");
  }
}

module.exports = UserRepo;
