const { servicePackageController } = require("../controllers/serviecepackage");
const router = require("express").Router();

router.get(
  "/get-all-service-package",
  servicePackageController.getServiecePackage
);
router.post(
  "/add-service-package",
  servicePackageController.addServiecePackage
);
router.delete(
  "/remove-service-package",
  servicePackageController.removeServiecePackage
);
router.patch(
  "/edit-service-package",
  servicePackageController.editServiecePackage
);
module.exports = router;
