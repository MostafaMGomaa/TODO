const router = require("express").Router();

router.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Hello Task",
    },
  });
  next();
});

module.exports = router;
