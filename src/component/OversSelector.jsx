import React from "react";

const OversSelector = ({ onStart }) => {
  const handleSelect = (selectedOvers) => {
    onStart(selectedOvers);
  };

  return (
    <div className="overs-selector-container">
      <div className="overs-selector bg-opacity-70 bg-green-800 text-white p-6 border border-gray-600 rounded-md shadow-md w-96">
        <h2 className="text-center text-lg font-bold mb-4">Select Number of Overs</h2>
        <div className="flex flex-col items-center mb-4">
          {/* Predefined buttons */}
          <div className="flex space-x-2 mb-4">
            {[5, 10, 15, 20, 50].map((num) => (
              <button
                key={num}
                onClick={() => handleSelect(num)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OversSelector;
