const { UserController } = require("../controllers/user");

const router = require("express").Router();

router.post("/create", UserController.createUser);
router.post("/auto-create-user", UserController.autoCreateUser);
router.get("/getUser/:id", UserController.getUserById);
router.post("/updateUser", UserController.createUser);
router.delete("/deleteUser", UserController.deleteUser);

module.exports = router;
