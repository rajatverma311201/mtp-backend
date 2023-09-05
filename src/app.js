const express = require("express");
const userRouter = require("./routes/userRoutes");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRouter);

module.exports = app;
