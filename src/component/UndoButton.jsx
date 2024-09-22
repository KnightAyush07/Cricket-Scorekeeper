// src/component/UndoButton.jsx

import React from "react";

const UndoButton = ({ onUndo }) => {
  return (
    <button
      onClick={onUndo}
      className="bg-red-600 text-white p-2 rounded-md shadow-md hover:bg-red-700 transition duration-300"
    >
      Undo
    </button>
  );
};

export default UndoButton;
