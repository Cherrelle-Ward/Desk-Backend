const mongoose = require("mongoose");
// const userSchema = require("./userSchema");

const deskSchema = new mongoose.Schema({
  deskID: {
    type: mongoose.ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("Desk", deskSchema);
