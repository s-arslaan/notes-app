import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const s1 = {
    name: "ars",
    class: "A",
  };
  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "ars1",
        class: "A+",
      });
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{state, update}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
