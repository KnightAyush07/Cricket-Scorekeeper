import React, { useState } from "react";

const DropdownMenu = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Function to group history into overs
  const groupOvers = (entries) => {
    const overs = [];
    let currentOver = [];

    entries.forEach((entry) => {
      entry.currentOver.forEach((ball) => {
        if (ball !== null) {
          if (currentOver.length === 6) {
            overs.push(currentOver);
            currentOver = [];
          }
          currentOver.push(ball);
        }
      });
    });

    // Push any remaining balls if the over is not yet complete
    if (currentOver.length > 0) {
      if (currentOver.length === 6) {
        overs.push(currentOver);
      } else {
        overs.push(currentOver);
      }
    }

    return overs;
  };

  const groupedOvers = groupOvers(history);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        History
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-md z-10">
          <ul className="py-1">
            {groupedOvers.length === 0 ? (
              <li className="px-4 py-2 text-gray-700">No history available</li>
            ) : (
              groupedOvers.map((over, index) => (
                <li key={index} className="px-4 py-2 border-b border-gray-200">
                  <div className="font-bold mb-1">Over {index + 1}</div>
                  <div className="flex flex-wrap">
                    {over.map((ball, i) => (
                      <span
                        key={i}
                        className={`mr-2 px-2 py-1 rounded-md ${
                          ball === null
                            ? "bg-gray-200 text-gray-600"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {ball === null ? "-" : ball}
                      </span>
                    ))}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
