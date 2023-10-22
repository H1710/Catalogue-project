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

      const user = await User.create(info);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await db.user.findByPk(userId);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const newData = {
        name: req.body.name,
        address: req.body.address,
        type_register: req.body.type_register,
        email: req.body.email,
        password: req.body.password,
        end_date: req.body.end_date,
      };

      const user = await db.user.findByPk(userId);
      if (user) {
        await user.update(newData);
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await db.user.findByPk(userId);
      if (user) {
        await user.destroy();
        res.status(204).send();
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }

}

exports.UserController = UserController;
