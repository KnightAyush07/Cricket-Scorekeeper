// component/InningsEndBox.jsx
import React from "react";
import "./InningsEndBox.css"; // Import the CSS file for styling

const InningsEndBox = ({ totalRuns, totalWickets }) => {
  return (
    <div className="innings-end-overlay">
      <div className="innings-end-box">
        <h2 className="box-title">Innings Ended</h2>
        <p className="total-score">
          Total Score: <span className="score">{totalRuns}</span>
        </p>
        <p className="total-wickets">
          Total Wickets: <span className="wickets">{totalWickets}</span>
        </p>
      </div>
    </div>
  );
};

export default InningsEndBox;
