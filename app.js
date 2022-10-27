require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql2");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

rl.question(
  "Which database do you want to connect to?\n1. MongoDB\n2. SQL\n",
  function (response) {
    switch (response) {
      case "1":
        // ROUTE FILES
        const deskRoutes = require("./routes/MongoDB/deskRoutes");
        const bookingRoutes = require("./routes/MongoDB/bookingRoutes");
        const userRoutes = require("./routes/MongoDB/userRoutes");

        // routes
        app.use("/desk", deskRoutes);
        app.use("/booking", bookingRoutes);
        app.use("/user", userRoutes);

        //Database connection
        console.log("Connecting to MongoDB at:\n" + process.env.MONGO_URI);
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

        break;
      case "2":
        // ROUTE FILES
        const deskRoutesSQL = require("./routes/SQL/deskRoutes");
        const bookingRoutesSQL = require("./routes/SQL/bookingRoutes");
        const userRoutesSQL = require("./routes/SQL/userRoutes");

        // routes
        app.use("/desk", deskRoutesSQL);
        app.use("/booking", bookingRoutesSQL);
        app.use("/user", userRoutesSQL);

        //Database connection
        console.log("Connecting to MongoDB at:\n");
        mysql
          .createConnection()
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

        break;
      default:
        break;
    }
  }
);
