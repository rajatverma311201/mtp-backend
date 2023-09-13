const db = require("../db");
const { ERROR, TABLE } = require("../utils/constants");
const Repository = require("./Repository");

class XirrRepo extends Repository {
  constructor(tableName) {
    super(tableName);
  }

  async findByUserId(userId) {
    const query = `SELECT * FROM xirrs WHERE user_id=${userId}`;
    return db.query(query);
  }

  async create({ userId, date, amount }) {
    if (!(date && amount)) {
      throw new Error(ERROR.MISSING_VALUES);
    }

    return super.create({
      user_id: userId,
      date: date,
      amount: amount,
    });
  }

  async update(xirrId, userId, { date, amount }) {
    if (!xirrId) {
      throw new Error(`Xirr ${ERROR.ID_MISSING}`);
    }

    if (!(date || amount)) {
      throw new Error(ERROR.NO_FIELD_TO_UPDATE);
    }

    const updateObj = {};

    if (date) {
      updateObj["date"] = date;
    }
    if (amount) {
      updateObj["amount"] = amount;
    }

    const conditionsObj = {
      id: xirrId,
      user_id: userId,
    };

    return super.update(updateObj, conditionsObj);
  }

  async delete(xirrId, userId) {
    if (!xirrId) {
      throw new Error(`Xirr ${ERROR.ID_MISSING}`);
    }
    return super.delete({ id: xirrId, user_id: userId });
  }
}

module.exports = new XirrRepo(TABLE.XIRRS);
