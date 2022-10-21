require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const deskRoutes = require("./routes/deskBookingRoutes.js");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/", deskRoutes);

//Database connection
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
