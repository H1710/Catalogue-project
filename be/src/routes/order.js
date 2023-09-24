const { Order } = require("../controllers/order");
const router = require("express").Router();
const db = require("../models/index");


router.post("/add-order", Order.addOrder);



module.exports = router;