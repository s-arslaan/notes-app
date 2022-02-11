const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();

// ROUTE 3: Get loggedin User details using: POST "api/auth/getuser" LOGIN REQUIRED
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

module.exports = router;
