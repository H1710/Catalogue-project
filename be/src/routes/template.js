const { TemplateController } = require("../controllers/template");

const router = require("express").Router();

router.post("/create", TemplateController.createTemplate);
router.get("/get/:templateId", TemplateController.getTemplate);
router.get("/get-all", TemplateController.getAllTemplate);

module.exports = router;
