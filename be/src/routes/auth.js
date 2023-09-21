const { AuthController } = require("../controllers/auth");

const router = require("express").Router();

router.post("/first-step-registeration", AuthController.firstStepRegisteration);

module.exports = router;
