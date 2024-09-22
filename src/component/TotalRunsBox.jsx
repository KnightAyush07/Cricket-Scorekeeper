import React from "react";

const TotalRunsBox = ({ totalRuns }) => {
  return (
    <div className="total-runs-box bg-opacity-70 bg-gray-900 text-white p-4 border border-gray-600 rounded-md shadow-md">
      <h2 className="text-center text-lg font-bold">Total Runs</h2>
      <p className="text-center text-2xl font-bold mt-2">{totalRuns}</p>
    </div>
  );
};

export default TotalRunsBox;
