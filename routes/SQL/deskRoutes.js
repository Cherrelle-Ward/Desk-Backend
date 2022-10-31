const express = require("express");
const router = express.Router();

const {
    getDesks,
    addDesk,
    deleteDesk,
} = require("../../controllers/SQL/deskController");

// get desks
router.get("/", getDesks);

// add a new desk
router.post("/", addDesk);

// delete a desk booking by deskID
router.delete("/:id", deleteDesk);

module.exports = router;