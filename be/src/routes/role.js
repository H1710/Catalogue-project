const { RoleController } = require("../controllers/role");
const router = require("express").Router();

router.post("/auto-create-role", RoleController.autoCreateRoles);

module.exports = router;
