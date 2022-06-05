const app = require("express")();

const userRouter = require("./routes/userRouter");
const tasksRouter = require("./routes/tasksRouter");

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;
