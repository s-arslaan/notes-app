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

// ROUTE 3: Update an existing Note using: PUT "api/notes/updatenote" LOGIN REQUIRED
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Create a new note obj
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find if the user is authorized to update the note
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // Find the Note and update it
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "api/notes/deletenote" LOGIN REQUIRED
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find if the user is authorized to delete the note
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    // Find the Note and delete it
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Successfully deleted note", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
