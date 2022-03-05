import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6207c3d9b0096dba0b96c4ff",
      user: "62066caf852fcaf3f9de2e71",
      title: "my title ars5 updated5",
      description: "A new description (updated)",
      tag: "personal",
      date: "2022-02-12T14:27:37.867Z",
      __v: 0,
    },
    {
      _id: "620952c72d6d0e17973c7453",
      user: "62066caf852fcaf3f9de2e71",
      title: "my title arslaan",
      description: "A description new",
      tag: "personal",
      date: "2022-02-13T18:49:43.440Z",
      __v: 0,
    },{
      _id: "620952c72d6d0e17973c7453",
      user: "62066caf852fcaf3f9de2e71",
      title: "my title arslaan1",
      description: "A description new1",
      tag: "personal",
      date: "2022-02-13T18:49:43.440Z",
      __v: 0,
    },{
      _id: "620952c72d6d0e17973c7453",
      user: "62066caf852fcaf3f9de2e71",
      title: "my title arslaan2",
      description: "A description new2",
      tag: "personal",
      date: "2022-02-13T18:49:43.440Z",
      __v: 0,
    },{
      _id: "620952c72d6d0e17973c7453",
      user: "62066caf852fcaf3f9de2e71",
      title: "my title arslaan3",
      description: "A description new3",
      tag: "personal",
      date: "2022-02-13T18:49:43.440Z",
      __v: 0,
    },{
      _id: "620952c72d6d0e17973c7453",
      user: "62066caf852fcaf3f9de2e71",
      title: "my title arslaan4",
      description: "A description new4",
      tag: "personal",
      date: "2022-02-13T18:49:43.440Z",
      __v: 0,
    },{
      _id: "620952c72d6d0e17973c7453",
      user: "62066caf852fcaf3f9de2e71",
      title: "my title arslaan5",
      description: "A description new5",
      tag: "personal",
      date: "2022-02-13T18:49:43.440Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
