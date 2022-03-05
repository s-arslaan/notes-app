import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get All Notes
  const getNotes = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNjZjYWY4NTJmY2FmM2Y5ZGUyZTcxIn0sImlhdCI6MTY0NDY3NjAwNH0.8wpu5fWwjfLlz3alSOD6z7ixoXozL8-Ooa5kYB01Xdc",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Delete a Note
  const deleteNote = (id) => {
    console.log("deleting:" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwNjZjYWY4NTJmY2FmM2Y5ZGUyZTcxIn0sImlhdCI6MTY0NDY3NjAwNH0.8wpu5fWwjfLlz3alSOD6z7ixoXozL8-Ooa5kYB01Xdc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // edit logic at client
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
