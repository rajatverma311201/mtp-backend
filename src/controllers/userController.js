const UserRepo = require("../repositories/UserRepo");

module.exports = {
  async getAllUsers(req, res) {
    const users = await UserRepo.find();

    res.send(users);
  },
};
