const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  deleteBooking,
} = require("../controllers/bookingControllers");

// get desk booking
router.get("/", getBookings);

//get a desk by date
// router.get("/", (req, res) => {
//   res.json({ msg: "GET desk bookings" });
// });

// post a new desk booking
router.post("/", createBooking);

// delete a desk booking by deskID and date
router.delete("/:id", deleteBooking);
module.exports = router;
