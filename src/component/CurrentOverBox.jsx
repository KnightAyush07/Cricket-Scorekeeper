import React from "react";

const CurrentOverBox = ({ currentOver, highlighted, overNumber }) => {
  return (
    <div className="current-over-box bg-opacity-70 bg-gray-800 text-white p-4 border border-gray-600 rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <div className="text-center mb-4">
          <span className="text-lg font-bold">Over: </span>
          <span className="ml-2 text-xl font-bold">{overNumber}</span>
        </div>
        <div className="flex gap-2 justify-center">
          {currentOver.map((item, index) => (
            <button
              key={index}
              className={`over-button ${
                item === "6" || item === "4" ? "bg-yellow-500" :
                item === highlighted ? "bg-yellow-500" :
                item === "W" ? "bg-red-500" : "bg-gray-600"
              }`}
              disabled
            >
              {item || "-"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentOverBox;
