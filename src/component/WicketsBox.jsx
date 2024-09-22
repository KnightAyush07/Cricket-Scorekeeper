// src/component/WicketsBox.jsx
import React from "react";

const WicketsBox = ({ onAddWicket }) => {
  // Handles wicket button clicks
  const handleWicketClick = (event, wicketType) => {
    event.preventDefault(); // Prevents the default form submission behavior
    onAddWicket(wicketType); // Calls the onAddWicket function with the wicket type
  };

  return (
    <div className="wickets-box bg-opacity-70 bg-red-800 text-white p-4 border border-gray-600 rounded-md shadow-md">
      <h2 className="box-title text-center text-lg font-bold mb-4">Wickets</h2>
      <div className="wickets-buttons grid grid-cols-2 gap-4">
        <button
          className="wickets-button"
          onClick={(e) => handleWicketClick(e, "B")}
        >
          Bowled (B)
        </button>
        <button
          className="wickets-button"
          onClick={(e) => handleWicketClick(e, "C")}
        >
          Caught Out (C)
        </button>
        <button
          className="wickets-button"
          onClick={(e) => handleWicketClick(e, "R")}
        >
          Run Out (R)
        </button>
        <button
          className="wickets-button"
          onClick={(e) => handleWicketClick(e, "H")}
        >
          Hit Wicket (H)
        </button>
        <button
          className="wickets-button"
          onClick={(e) => handleWicketClick(e, "L")}
        >
          LBW (L)
        </button>
      </div>
    </div>
  );
};

export default WicketsBox;
