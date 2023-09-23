const { servicePackageController } = require("../controllers/package");
const router = require("express").Router();

router.post('/add-service-package', servicePackageController.addService);
router.post('/remove-service-package', servicePackageController.removeService);
router.post('/edit-service-package', servicePackageController.editService);
module.exports = router;