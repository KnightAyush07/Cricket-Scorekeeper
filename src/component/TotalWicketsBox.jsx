import React from "react";

const TotalWicketsBox = ({ totalWickets }) => {
  return (
    <div className="total-wickets-box bg-opacity-70 bg-gray-900 text-white p-4 border border-gray-600 rounded-md shadow-md">
      <h2 className="text-center text-lg font-bold">Total Wickets</h2>
      <p className="text-center text-2xl font-bold mt-2">{totalWickets}</p>
    </div>
  );
};

export default TotalWicketsBox;
