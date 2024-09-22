import React, { useState } from "react";

const DropdownButton = ({ allOvers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOver, setSelectedOver] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectOver = (over) => {
    setSelectedOver(over);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container absolute top-4 right-4">
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {selectedOver ? `Over ${allOvers.indexOf(selectedOver) + 1}` : "Select Over"}
      </button>
      {isOpen && (
        <div className="dropdown-menu bg-white text-black border border-gray-300 rounded-md shadow-md mt-2 absolute right-0 w-48">
          <ul>
            {allOvers.map((over, index) => (
              <li
                key={index}
                onClick={() => handleSelectOver(over)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Over {index + 1}: {over.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
