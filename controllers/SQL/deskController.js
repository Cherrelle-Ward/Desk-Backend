const Desk = require("../../models/deskSchema");
const User = require("../../models/userSchema");

const mongoose = require("mongoose");

//! get desk
const getDesks = async (req, res) => {
  const desk = await Desk.find();
  res.status(200).json(desk);
};

//!  create desk
const addDesk = async (req, res) => {
  const { deskID } = req.body;
  //adding doc to database
  try {
    const desk = await Desk.create({ deskID });
    res.status(200).json(desk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//!  delete desk
const deleteDesk = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }

  const desk = await Desk.findOneAndDelete({ id });

  if (!desk) {
    return res.status(400).json({ error: "No such desk" });
  }

  res.status(200).json(desk);
};

module.exports = {
  getDesks,
  addDesk,
  deleteDesk,
};
