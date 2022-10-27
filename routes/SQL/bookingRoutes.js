const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  deleteBooking,
  //getBookingByID,
  getBookingByDate,
} = require("../../controllers/SQL/bookingController");

//get bookings by date
router.get("/date/:date", getBookingByDate);

// get booking
router.get("/", getBookings);

//get a booking by ID
//router.get("/:id", getBookingByID);

// create a new booking
router.post("/", createBooking);

// delete a booking by deskID and date
router.delete("/:id", deleteBooking);

module.exports = router;
