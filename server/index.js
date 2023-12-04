const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const exampleRoutes = require("./routes/exampleRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({message: "Welcome"});
});

//routes
// app.use("/api/examples", exampleRoutes);

module.exports = app;
