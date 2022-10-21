const Booking = require("../models/deskSchema");
// const User = require("..models/userSchema");

const mongoose = require("mongoose");

//! get desk booking
const getBookings = async (req, res) => {
  const deskBooking = await Booking.find();
  res.status(200).json(deskBooking);
};

//! get desk booking by date & desk id
const getBookingByID = async (req, res) => {
  const { deskID, date, userName } = req.body;
  const deskBooking = await Booking.find().where({ deskID });
  res.status(200).json(deskBooking);
};

//!  create desk booking
const createBooking = async (req, res) => {
  const { deskID, date, userName } = req.body;

  //adding doc to database
  try {
    const booking = await Booking.create({ deskID, date, userName });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//!  delete desk booking desk id & date
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }

  const booking = await Booking.findOneAndDelete({ _id: id });

  if (!booking) {
    return res.status(400).json({ error: "No such desk booking" });
  }

  res.status(200).json(booking);
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
  getBookingByID,
};
