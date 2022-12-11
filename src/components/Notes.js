import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    edit_title: "",
    edit_description: "",
    edit_tag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      edit_title: currentNote.title,
      edit_description: currentNote.description,
      edit_tag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    console.log("updating:", note);
    editNote(note.id, note.edit_title, note.edit_description, note.edit_tag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <button
            type="button"
            ref={ref}
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#updateNote_modal"
          >
            Launch modal
          </button>

          {/* <!-- EDIT NOTE Modal --> */}
          <div
            className="modal fade"
            id="updateNote_modal"
            tabIndex="-1"
            aria-labelledby="updateNote_modal_label"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content bg-dark">
                <div className="modal-header">
                  <h5 className="modal-title" id="updateNote_modal_label">
                    Edit Note
                  </h5>
                  {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="edit_title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="edit_title"
                        name="edit_title"
                        onChange={onChange}
                        value={note.edit_title}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edit_description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="edit_description"
                        name="edit_description"
                        onChange={onChange}
                        rows='5'
                        defaultValue={note.edit_description}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edit_tag" className="form-label">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="edit_tag"
                        name="edit_tag"
                        onChange={onChange}
                        value={note.edit_tag}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    ref={refClose}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    disabled={
                      note.edit_title.length < 5 ||
                      note.edit_description.length < 5
                    }
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClick}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="mb-2">
              <h2 className="d-inline">Your Notes</h2>&emsp;
              <span className="align-middle float-end">
                <AddNote showAlert={props.showAlert} />
              </span>
            </div>
            <div className="container">
              {notes.length === 0 && "No notes Found!"}
            </div>
            {notes.map((note) => {
              return (
                <NoteItem
                  key={note._id}
                  updateNote={updateNote}
                  note={note}
                  showAlert={props.showAlert}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Notes;
