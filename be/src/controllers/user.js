const db = require("../models/index");

const User = db.user;
class UserController {
  static async createUser(req, res) {
    let info = {
      name: req.body.name,
      address: req.body.address,
      type_register: req.body.type_register,
      email: req.body.email,
      password: req.body.password,
      endDate: req.body.date,
    };

    const user = await User.create(info);
    res.status(200).send(user);
    console.log(user);
  }
}

exports.UserController = UserController;
