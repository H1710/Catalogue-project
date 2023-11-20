const db = require("../models/index");
const jwt = require("jsonwebtoken");

const User = db.user;
class AuthMiddleware {
  static async auth(req, res, next) {
    try {
      const token = req.header("Authorization");
      console.log(token);
      if (!token)
        return res
          .status(400)
          .json({ message: "User should login to use this function" });

      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
      if (!decoded)
        return res
          .status(400)
          .json({ message: "User should login to use this function" });

      const user = await User.findByPk(decoded.id);
      if (!user)
        return res
          .status(400)
          .json({ message: "User should login to use this function" });

      req.user = user;

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async validateAdmin(req, res, next) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: "User not found" });
      }
      console.log(req.user.dataValues.roleId);
      if (req.user.dataValues.roleId !== 1) {
        return res
          .status(500)
          .json({ message: "User have not permission to access this page" });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AuthMiddleware;
