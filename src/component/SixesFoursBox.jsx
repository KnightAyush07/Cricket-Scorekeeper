import React from "react";

const SixesFoursBox = ({ sixes, fours }) => {
  return (
    <div className="sixes-fours-box bg-opacity-70 bg-yellow-800 text-white p-4 border border-gray-600 rounded-md shadow-md">
      <h2 className="text-center text-lg font-bold mb-4">Boundaries</h2>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold mb-2">
          <span className="block">Sixes: {sixes}</span>
          <span className="block">Fours: {fours}</span>
        </div>
      </div>
    </div>
  );
};

export default SixesFoursBox;
