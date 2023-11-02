const { ProductController } = require("../controllers/product");

const router = require("express").Router();

router.post("/create", ProductController.createTemplate);
// router.get("/get/:id", TemplateController.getTemplate);
module.exports = router;
