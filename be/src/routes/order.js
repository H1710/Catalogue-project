const { OrderController } = require("../controllers/order");
const router = require("express").Router();

router.post("/add-order", OrderController.addOrder);
router.post("/auto-create-order", OrderController.autoCreateOrder);
router.get("/get-all-order", OrderController.getAllOrder);
router.get("/get-monthly-revenue", OrderController.getMonthlyRevenue);
router.get("/get-yearly-revenue", OrderController.getYearlyRevenue);
router.get("/get-order-by-year/:year", OrderController.getOrderByYear);
module.exports = router;
