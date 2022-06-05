const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");
const tasksRouter = require("./routes/tasksRouter");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

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
