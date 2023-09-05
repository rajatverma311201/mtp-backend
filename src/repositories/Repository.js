const db = require("../db");
const { ERROR } = require("../utils/constants");

class Repository {
  constructor(tableName) {
    this.table = tableName;
  }

  allFieldsDefined(obj) {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      return false;
    }
    for (let key in keys) {
      if (obj[key] === undefined) {
        return false;
      }
    }
    return true;
  }

  async find() {
    return db.query(`SELECT * from ${table}`);
  }

  async findById(id) {
    if (!id) {
      throw new Error(ERROR.ID_MISSING);
    }

    const query = `
        SELECT * 
        FROM ${table} 
        WHERE id=${id};
    `;

    return db.query(query);
  }

  async create(obj) {
    if (!allFieldsDefined(obj)) {
      throw new Error(ERROR.MISSING_VALUES);
    }

    const keys = Object.keys(obj);
    const columnNames = keys.join(", ");

    const values = Object.values(obj);
    const columnValues = values.join(", ");

    const query = `
        INSERT INTO ${table} (${columnNames}) 
        VALUES (${columnValues})
    `;

    return db.query(query);
  }

  async update(updateObj, conditionsObj) {
    const uKeys = Object.keys(updateObj);
    const updateData = uKeys
      .map((key, idx) => `${key} = ${updateObj[key]}`)
      .join(", ");

    const cKeys = Object.keys(conditionsObj);
    const conditions = cKeys
      .map((key) => `${key} = ${conditionsObj[key]}`)
      .join(" AND ");

    const query = `
        UPDATE ${table}
        SET ${updateData}
        WHERE ${conditions};
    `;

    return db.query(query);
  }

  async delete(obj) {
    if (!allFieldsDefined(obj)) {
      throw new Error(ERROR.MISSING_VALUES);
    }

    const keys = Object.keys(obj);
    const conditions = keys.map((key) => `${key} = ${obj[key]}`).join(" AND ");

    const query = `
        DELETE FROM ${table} 
        WHERE ${conditions};
    `;

    return db.query(query);
  }
}

module.exports = Repository;
