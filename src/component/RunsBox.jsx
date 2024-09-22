import React from "react";

const RunsBox = ({ onAddRuns }) => {
  return (
    <div className="runs-box bg-opacity-70 bg-blue-800 text-white p-4 border border-gray-600 rounded-md shadow-md">
      <h2 className="box-title text-center text-lg font-bold mb-4">Runs</h2>
      <div className="runs-buttons grid grid-cols-3 gap-4">
        <button className="runs-button" onClick={() => onAddRuns(1)}>
          1
        </button>
        <button className="runs-button" onClick={() => onAddRuns(2)}>
          2
        </button>
        <button className="runs-button" onClick={() => onAddRuns(3)}>
          3
        </button>
        <button className="runs-button" onClick={() => onAddRuns(4)}>
          4
        </button>
        <button className="runs-button" onClick={() => onAddRuns(5)}>
          5
        </button>
        <button className="runs-button" onClick={() => onAddRuns(6)}>
          6
        </button>
      </div>
    </div>
  );
};

export default RunsBox;
