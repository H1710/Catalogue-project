const { TemplateController } = require("../controllers/template");

const router = require("express").Router();
const upload = require("../utils/storageImage");

router.post(
  "/create",
  upload.single("thumbnail"),
  TemplateController.createTemplate
);
router.get("/get/:templateId", TemplateController.getTemplate);
router.get("/get-all", TemplateController.getAllTemplate);

module.exports = router;
