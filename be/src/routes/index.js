const router = require("express").Router();
const userRoute = require("./user");
const templateRoute = require("./template");
const authRoute = require("./auth");

router.use("/user", userRoute);
router.use("/template", templateRoute);
router.use("/auth", authRoute);
//http://localhost:5000/api/v1/auth

router.use("/", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
