const { UserController } = require("../controllers/user");

const router = require("express").Router();

router.post("/create", UserController.createUser);
router.get("/getUserById", UserController.getUserById);
router.post("/updateUser", UserController.createUser);
router.delete("/deleteUser", UserController.deleteUser);
module.exports = router;
