const db = require("../models/index");
const sendVerificationEmail = require("../utils/verifyEmail");

const User = db.user;

// login, logout, firststep, submitOTP, setInfo

class AuthController {
  static async firstStepRegisteration(req, res) {
    try {
      const { email, password } = req.body;

      // Xử lí
      // hash password ...

      await User.create({});

      res.status(200).send({ message: "Success: " + email });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
  static async submitOTP(req, res) {
    try {
      const { email, OTPcode } = req.body;

      // Xử lí

      res.status(200).send({ message: "Success" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Xử lí

      res.status(200).send({ message: "Success" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
}

exports.AuthController = AuthController;
