const db = require("../models/index");
const sendVerificationEmail = require("../utils/verifyEmail");

class AuthController {
  static async firstStepRegisteration(req, res) {
    try {
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
}

exports.AuthController = AuthController;
