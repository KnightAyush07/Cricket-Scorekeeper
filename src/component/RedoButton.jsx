// src/component/RedoButton.jsx
import React from "react";

const RedoButton = ({ onRedo }) => {
  return (
    <button
      onClick={onRedo}
      className="bg-green-600 text-white p-2 rounded-md shadow-md hover:bg-green-700 transition duration-300"
    >
      Redo
    </button>
  );
};

export default RedoButton;
