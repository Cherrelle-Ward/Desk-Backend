const mongoose = require("mongoose");
const userSchema = require("./userSchema");

const deskSchema = new mongoose.Schema({
  deskID: {
    type: mongoose.ObjectId,
    required: true,
  },
  date: { type: "string", format: "date", required: true },
  userName: { type: String, required: true },
});
module.exports = mongoose.model("Desk", deskSchema);
