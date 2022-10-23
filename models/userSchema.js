const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
