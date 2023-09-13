const router = require("express").Router();
const userRoute = require("./user");

router.use("/user", userRoute);

router.use("/", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
