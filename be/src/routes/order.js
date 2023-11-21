const { OrderController } = require("../controllers/order");
const AuthMiddleware = require("../middleware/authentication");

const router = require("express").Router();

router.post("/add-order", OrderController.addOrder);
router.post("/auto-create-order", OrderController.autoCreateOrder);
router.get(
  "/get-all-order",
  AuthMiddleware.auth,
  AuthMiddleware.validateAdmin,
  OrderController.getAllOrder
);
router.get("/get-monthly-revenue", OrderController.getMonthlyRevenue);
router.get("/get-yearly-revenue", OrderController.getYearlyRevenue);
router.get("/get-order-by-year/:year", OrderController.getOrderByYear);
router.get("/get-historical-order", OrderController.getHistoricalOrder);
module.exports = router;
