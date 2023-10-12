const { OrderController } = require("../controllers/order");
const router = require("express").Router();

router.post("/add-order", OrderController.addOrder);
router.post("/auto-create-order", OrderController.autoCreateOrder);

module.exports = router;
