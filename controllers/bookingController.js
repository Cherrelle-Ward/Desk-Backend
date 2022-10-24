const Booking = require("../models/bookingSchema");
const User = require("../models/userSchema");

const mongoose = require("mongoose");
const { createIndexes } = require("../models/bookingSchema");

//! get desk booking
const getBookings = async (req, res) => {
  const booking = await Booking.find();
  res.status(200).json(booking);
};

//! get booking desk id
const getBookingByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }

  const booking = await Booking.find().where({ id });
  res.status(200).json(booking);
};

//! get booking by date
const getBookingByDate = async (req, res) => {
  const date = req.params.date;
  console.log("booking date: ", date);
  const booking = await Booking.findOne().where("date").equals(date);

  if (!booking) {
    return res.status(400).json({ error: "No such desk booking" });
  }

  res.status(200).json(booking);
};

//!  create desk booking
const createBooking = async (req, res) => {
  const { deskID, date, userName } = req.body;
  //regex to validate date - stretch goal

  /////////////////////////////
  // if no user created it will return
  // const user = await User.findOne({ userName });
  // if (!user) {
  //   return res.status(400).json({ error: "Not a valid User account" });
  // }

  let booking = { deskID, userName };
  booking.deskID = deskID;
  booking.userName = userName;

  let dateBooked = await Booking.find().where("date").equals(date).findOne();

  //check if date is already booked
  if (dateBooked) {
    const deskBooked = dateBooked.bookings.filter(
      (desk) => String(desk.deskID) === String(booking.deskID)
    );
    if (deskBooked.length > 0) {
      return res.status(400).json({ error: "Desk already booked" });
    }

    //if the desk is free on that date
    //add desk to date
    //update booking
    dateBooked.bookings.push(booking);

    try {
      //save booking
      dateBooked.save();
    } catch (error) {
      console.log(error);
    }
    return res.status(200).json(dateBooked);
  }

  // adding doc to database
  console.log("creating new booking");
  const newBooking = new Booking({
    date: date,
    bookings: {
      deskID: deskID,
      userName: userName,
    },
  });

  try {
    const booking = await Booking.create(newBooking);
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// //!  delete desk booking desk id & date

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }

  try {
    const findDate = await Booking.findOne({ date });

    // console.log(JSON.stringify(findDate.bookings));

    if (findDate) {
      const booking = await Booking.updateOne(
        { date: date },
        { $pull: { bookings: { _id: id } } }
      );
      res.status(200).json(booking);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// const deleteBooking = async (req, res) => {
//   const { id, date } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Not a valid id" });
//   }

//   const desk = await Booking.find().where({ deskID: id });
//   booking = desk.bookings.filter((booking) => booking.date == date);

//   if (!booking) {
//     return res.status(400).json({ error: "No such desk booking" });
//   }

//   desk.bookings.indexOf(booking).remove();
//   Booking.save();

//   res.status(200).json(desk);
// };

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
  //getBookingByID,
  getBookingByDate,
};

// create a user, desk, and booking
// only a user can create a booking
//if your another user it will say the desk is already booked
//if a non valid user tries to book it throws error of not valid user

// catch errors for desks not in db && user - cant create that booking

//delete based on desk id and date if the user exists ?
