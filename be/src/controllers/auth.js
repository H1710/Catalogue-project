const db = require("../models/index");
const sendEmail = require("../utils/sendEmail");
const { Token } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const uploadImage = require("../utils/uploadImage");
const jwt = require("jsonwebtoken");

const User = db.user;
const Role = db.role;
const Order = db.order;
const Package = db.servicePackage;

class AuthController {
  static async auth(req, res, next) {
    try {
      const token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ message: "Invalid Authentication." });

      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
      if (!decoded)
        return res.status(400).json({ message: "Invalid Authentication." });

      const user = await User.findOne({ _id: decoded._id });
      if (!user)
        return res.status(400).json({ message: "User does not exist." });

      req.user = user;

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email: email },
        attributes: ["id", "name", "email", "password"],
        include: [
          {
            model: Order,
            attributes: ["id", "servicePackageId"],
            include: [
              {
                model: Package,
                attributes: ["name"],
              },
            ],
          },
          {
            model: Role,
            attributes: ["name"],
          },
        ],
      });

      if (!user)
        return res
          .status(400)
          .send({ message: "This account does not exist." });

      const isMatch = await bcrypt.compare(password, user.dataValues.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Password incorrect." });
      }

      // if (!user.name) {
      //   return res
      //     .status(400)
      //     .send({ message: "Account has not been registered" });
      // }

      const access_token = await Token.generateAccessToken({ id: user.id });
      const refresh_token = await Token.generateRefreshToken({ id: user.id });
      await res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        sameSite: "none",
        secure: true,
      });
      return res.status(200).send({
        message: "Login successful",
        user: {
          ...user.dataValues,
          access_token: access_token,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to do somthing exceptional" });
    }
  }

  static async refresh_token(req, res, next) {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ message: "Please login now" });
      }

      const decode = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
      if (!decode) return res.status(400).json({ message: "Please login now" });
      if (decode.id) {
        const user = await User.findByPk(decode.id, {
          attributes: ["id", "name", "email"],
          include: [
            {
              model: Order,
              attributes: ["id", "servicePackageId", "createdAt"],
              include: [
                {
                  model: Package,
                  attributes: ["name", "remain_day"],
                },
              ],
            },
            {
              model: Role,
              attributes: ["name"],
            },
          ],
        });

        const access_token = await Token.generateAccessToken({ id: user.id });
        return res.status(200).json({ access_token, user });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to do somthing exceptional" });
    }
  }

  static async logout(req, res) {
    try {
      await res.clearCookie("refreshtoken", {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      return res.status(200).send({ message: "Logged out" });
    } catch (error) {
      return res.status(500).send({ message: "Logout error" });
    }
  }

  static async firstStepRegisteration(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (user && !user.otpCode) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const OTP = Math.floor(10000 + Math.random() * 900000);

      sendEmail(email, OTP);
      const hashedPassword = await bcrypt.hash(password, 10);
      if (user) {
        user.otpCode = OTP;
        user.password = hashedPassword;
        await user.save();
      } else {
        await User.create({
          email: email,
          otpCode: OTP,
          password: hashedPassword,
          typeRegister: "normal-register",
        });
      }
      return res.status(200).send({
        message: "Succcess. Check your mail to get OTP code",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to do something exceptional" });
    }
  }

  static async submitOTP(req, res) {
    try {
      const { email, OTPCode } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      if (OTPCode != user.otpCode) {
        return res.status(400).json({ message: "OTP code not correct." });
      }

      user.otpCode = 0;
      await user.save();

      return res.status(200).send({ message: "Register successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to do somthing exceptional." });
    }
  }

  static async setInfo(req, res, next) {
    try {
      const { name, email, country } = req.body;
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      user.name = name;
      user.country = country;
      user.roleId = 2;
      user.save();

      return res.status(200).send({ message: "Update info success." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to do somthing exceptional." });
    }
  }
}

exports.AuthController = AuthController;
