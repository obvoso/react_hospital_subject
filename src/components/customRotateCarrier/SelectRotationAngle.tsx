import React, { useState } from "react";

interface SelectProps {
  label: string;
  options: { label: string; value: any }[];
  onChange: (value: any) => void;
}

export default function SelectsRotationAngle({
  label,
  options,
  onChange,
}: SelectProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>([1]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (value: number) => {
    setSelectedValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((val) => val !== value)
        : [...prevValues, value]
    );
  };

  const handleCloseDropdown = () => {
    onChange(selectedValues);
    setDropdownOpen(false);
  };

  return (
    <>
      {dropdownOpen && (
        <div className="fixed inset-0 z-10" onClick={handleCloseDropdown}></div>
      )}
      <div className="flex flex-col w-fit px-3 mb-4 justify-center items-center">
        <span className="block text-gray-500 text-sm font-semibold mb-2 text-center">
          {label}
        </span>
        <button
          className="bg-white px-3 py-1 text-sm rounded border border-gray-300 shadow hover:border-gray-500 focus:outline-none focus:shadow-outline text-center"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedValues.length + "개"}
        </button>
        {dropdownOpen && (
          <div className="absolute bg-white border border-gray-300 mt-[16.5rem] sm:mt-[13.5rem] p-2 rounded shadow-lg flex flex-col items-start z-20">
            {options.map((option, index) => (
              <label key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  className="mr-2 h-8"
                />

                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
