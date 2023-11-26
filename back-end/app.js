const express = require("express");
const router = require("./src/routes/api");
const bodyParser = require("body-parser");
const app = new express();

//Security Lib Imports
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");

//Database Lib Import

const mongoose = require("mongoose");

//Security middleware implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Request rate Limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 2000,
});
app.use(limiter);
// const URL = 'mongodb://localhost:27017/StudentData'
const URL = `mongodb+srv://crud1111:crud1111@cluster0.of6vy9p.mongodb.net/StudentData`;
//Database connection
// mongoose.connect(URL)
// .then(() => {
//     console.log('MongoDB Connected');
// })
// .catch((err) => {
//     console.error('MongoDB Connection Error:', err);
//     // Gracefully handle the error, e.g., exit the application
//     process.exit(1);
// });
mongoose
  .connect(URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    // Gracefully handle the error, e.g., exit the application
    process.exit(1);
  });

// let URI =
//   "mongodb+srv://<username>:<password>@cluster0.7uslu.mongodb.net/CRUD4";
//   "mongodb+srv://<username>:<password>@cluster0.of6vy9p.mongodb.net/CRUD4";
// let OPTION = { user: "testuser7777", pass: "testuser7777", autoIndex: true };
// mongoose
//   .connect(URI, OPTION)
//   .then((res) => {
//     console.log("Success");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Routing implementation
app.use("/api/v1", router);

//undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "[ * Route not found * ]",
  });
});

module.exports = app;
