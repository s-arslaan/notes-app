import React, { useContext, useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const refClose = useRef(null);

  const handleClick = (e) => {
    // e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add New
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel">New Note</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              
              <div className="container my-3">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
              </form>
            </div>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default AddNote;
