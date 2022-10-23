require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

const deskRoutes = require("./routes/deskRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

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

//Database connection
console.log(process.env.REACT_APP_MONGO_URI);
mongoose
  .connect(process.env.REACT_APP_MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.REACT_APP_PORT, () => {
      console.log(
        "listening on port & connected to the database",
        process.env.REACT_APP_PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//400 no to request
// 200 everythings ok
