const router = require("express").Router();

router.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Hello User",
    },
  });
  next();
});
module.exports = router;
