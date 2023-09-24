const { servicePackage } = require("../controllers/serviecepackage");
const router = require("express").Router();

router.get("/get-all", servicePackage.getServiecePackage);
module.exports = router;