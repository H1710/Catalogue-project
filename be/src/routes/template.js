const { TemplateController } = require("../controllers/template");

const router = require("express").Router();

router.post("/create", TemplateController.createTemplate);
router.get("/get/:id", TemplateController.getTemplate);
module.exports = router;
