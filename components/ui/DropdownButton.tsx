"use client";
import React, { useEffect, useState } from "react";

type DropdownItem = {
  name: string;
  action: () => void;
};

interface DropdownButtonProps {
  dropdownItems?: DropdownItem[];
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ dropdownItems = [] }) => {
  const [selectedLabel, setSelectedLabel] = useState("Options");

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  return (
    <div className="dropdown">
      {/* Bootstrap Dropdown Button */}
      <button
        className="btn btn-light dropdown-toggle border border-gray-300 shadow-sm text-gray-700"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedLabel}
      </button>

      {/* Bootstrap Dropdown Menu */}
      <ul className="dropdown-menu">
        {dropdownItems.map((item, index) => (
          <li key={index}>
            <button
              className="dropdown-item text-gray-700 hover-bg-gray-100"
              onClick={() => {
                item.action();
                setSelectedLabel(item.name);
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownButton;