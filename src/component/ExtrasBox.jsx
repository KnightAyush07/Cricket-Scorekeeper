import React from "react";

const ExtrasBox = ({ onAddRuns }) => {
  return (
    <div className="extras-box bg-opacity-70 bg-green-800 text-white p-4 border border-gray-600 rounded-md shadow-md">
      <h2 className="box-title text-center text-lg font-bold mb-4">Extras</h2>
      <div className="extras-buttons grid grid-cols-2 gap-4">
        <button className="extras-button" onClick={() => onAddRuns('NB')}>
          No Ball
        </button>
        <button className="extras-button" onClick={() => onAddRuns('Wd')}>
          Wide
        </button>
        <button className="extras-button" onClick={() => onAddRuns('LB')}>
          Leg Bye
        </button>
        <button className="extras-button" onClick={() => onAddRuns('BY')}>
          Bye
        </button>
      </div>
    </div>
  );
};

export default ExtrasBox;
