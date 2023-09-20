const router = require("express").Router();
const userRoute = require("./user");
const templateRoute = require("./template");

router.use("/user", userRoute);
router.use("/template", templateRoute);

router.use("/", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
