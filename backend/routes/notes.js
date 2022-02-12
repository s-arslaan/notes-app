const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// ROUTE 1: Get All notes using: GET "api/notes/fetchallnotes" LOGIN REQUIRED
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "api/notes/addnote" LOGIN REQUIRED
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter Valid Title!").isLength({ min: 3 }),
    body("description", "Description too short!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // error message sending
      // if there are errors, send Bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // when no errors are found
      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
