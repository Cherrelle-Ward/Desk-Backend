require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

// ROUTE FILES
const deskRoutes = require("./routes/deskRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/desk", deskRoutes);
app.use("/booking", bookingRoutes);
app.use("/user", userRoutes);

//Database connection
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "listening on port & connected to the database",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//400 no to request
// 200 everythings ok
