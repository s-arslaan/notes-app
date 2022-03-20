import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {

  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card bg-dark my-3">
        <div className="d-flex justify-content-end position-absolute top-0 end-0">
          <span className="badge bg-danger p-1">
            <i
              className="fa-solid fa-trash-can mx-1"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </span>
          <span className="badge bg-success p-1">
            <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updateNote(note)}}></i>
          </span>
        </div>
        <div className="card-body my-2">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
