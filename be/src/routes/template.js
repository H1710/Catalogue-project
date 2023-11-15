const { TemplateController } = require("../controllers/template");

const router = require("express").Router();

router.post("/create", TemplateController.createTemplate);
router.get("/get/:templateId", TemplateController.getTemplate);
router.get("/get-all", TemplateController.getAllTemplate);
router.get("/get-template/:status", TemplateController.getTemplateProcessing)

module.exports = router;
