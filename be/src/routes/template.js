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
router.get("/get-template/:status", TemplateController.getTemplateProcessing);
router.get("/search-template/:name", TemplateController.searchTemplateByName);
router.patch("/accept-template", TemplateController.acceptTemplate);
router.patch("/denied-template", TemplateController.deniedTemplate);
router.get("/get-Accepted", TemplateController.getAcceptedTemplate);
router.post("/rating", TemplateController.ratingTemplate);
module.exports = router;
