const { OrderController } = require("../controllers/order");
const router = require("express").Router();

router.post("/add-order", OrderController.addOrder);

module.exports = router;
