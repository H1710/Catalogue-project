const { UserController } = require("../controllers/user");

const router = require("express").Router();

router.post("/create", UserController.createUser);
router.post("/auto-create-user", UserController.autoCreateUser);
module.exports = router;
