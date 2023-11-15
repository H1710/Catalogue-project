const { ProductController } = require("../controllers/product");

const router = require("express").Router();

router.post("/create", ProductController.createProduct);
router.get("/get/:userId", ProductController.getProductByUser);
router.get("/get/product/:productId", ProductController.getProductById);
router.post("/save", ProductController.saveProduct);
router.post("/clone", ProductController.cloneTemplate);
router.post("/save-name", ProductController.saveProductName);

module.exports = router;
