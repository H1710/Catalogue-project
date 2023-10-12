const db = require("../models/index");

const User = db.user;
class UserController {
  static async createUser(req, res) {
    try {
      let info = {
        name: req.body.name,
        address: req.body.address,
        type_register: req.body.type_register,
        email: req.body.email,
        password: req.body.password,
        endDate: req.body.date,
      };
      console.log(info)
      const user = await User.create(info);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
}

exports.UserController = UserController;
