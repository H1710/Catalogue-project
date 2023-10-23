const { servicePackageController } = require("../controllers/serviecepackage");
const router = require("express").Router();

router.get("/get-all", servicePackageController.getServiecePackage);
router.post(
  "/auto-generate",
  servicePackageController.autoGenerateServiecePackage
);
router.post("/create", servicePackageController.addServiecePackage);
router.delete("/delete", servicePackageController.removeServiecePackage);
router.patch("/update", servicePackageController.editServiecePackage);
module.exports = router;
