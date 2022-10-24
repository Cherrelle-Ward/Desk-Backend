const mongoose = require("mongoose");
const userSchema = require("./userSchema");

const deskSchema = new mongoose.Schema({
  deskID: { type: Number },
});
module.exports = mongoose.model("Desk", deskSchema);
