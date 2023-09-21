const db = require("../models/index");
const sendVerificationEmail = require("../utils/verifyEmail");

const User = db.user;



class AuthController {

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .send({ message: 'This account does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Password incorrect.' });
      }

      if (!user.lastname || !user.firstname) {
        return res
          .status(400)
          .send({ message: 'Account has not been registered' });
      }
      return res.status(200).send({
        message: 'Login successful',
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional' });
    }
  }

  static async logout(req, res) {
    try {
      await res.clearCookie('refreshtoken', {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      });
      return res.status(200).send({ message: 'Logged out.' });
    } catch (error) {
      return res.status(500).send({ message: 'Logout erro.r' });
    }
  }


  static async firstStepRegisteration(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user && !user.OTPCode) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const OTP = Math.floor(10000 + Math.random() * 900000);

      await sendVerificationEmail(email, OTP);

      const hashedPassword = await bcrypt.hash(password, 10);

      if (user) {
        user.OTPCode = OTP;
        user.password = hashedPassword;
        await user.save();
      } else {
        await User.create({
          email: email,
          OTPCode: OTP,
          password: hashedPassword,
        });
      }
      return res.status(200).send({
        message: 'Succcess. Check your mail to get OPTcode'
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Failed to do something exceptional' });
    }
  }




  static async submitOTP(req, res) {
    try {
      const { email, OTPCode } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }

      if (OTPCode != user.OTPCode) {
        return res.status(400).json({ message: 'OTP code not correct.' });
      }

      user.OTPCode = 0;
      await user.save();

      return res
        .status(200)
        .send({ message: 'Register successfully.' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional.' });
    }
  }

  static async setInfo(req, res, next) {
    try {
      const { firstname, lastname, email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }

      user.firstname = firstname;
      user.lastname = lastname;
      user.save();

      return res.status(200).send({ message: 'Update info success.' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional.' });
    }
  }
}


exports.AuthController = AuthController;
