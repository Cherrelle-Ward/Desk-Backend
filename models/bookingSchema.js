const mongoose = require("mongoose");
// const userSchema = require("./userSchema");

const bookingSchema = new mongoose.Schema({
  date: { type: "string", format: "date", required: true },
  bookings: [{
    deskID: { type: String, required: true },
    userName: { type: String, required: true },
  }],
});
module.exports = mongoose.model("Booking", bookingSchema);
