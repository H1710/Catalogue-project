const { AuthController } = require("../controllers/auth");

const router = require("express").Router();
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/first-step-registeration", AuthController.firstStepRegisteration);
router.post("/submitOTP", AuthController.submitOTP);
router.post("/setInfo", AuthController.setInfo);
module.exports = router;
