import React from "react";

interface DropDownButtonProps {
  label: string;
  options: { label: string; value: any }[];
  onChange: (value: number) => void;
  gridSize?: number;
}

export const DropDownButton = ({
  label,
  options,
  onChange,
  gridSize,
}: DropDownButtonProps) => {
  const handleChange = (event: any) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="mb-4 w-fit px-3 ">
      <label
        className="block text-gray-500 text-sm font-semibold mb-2 text-center"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        className="block appearance-none w-full text-sm bg-white border border-gray-300 hover:border-gray-500 px-3 py-1 rounded shadow focus:outline-none focus:shadow-outline text-center"
        id={label}
        onChange={handleChange}
        key={gridSize === undefined ? 0 : gridSize}
      >
        {options.map((option, index) => (
          <option
            key={index + (gridSize === undefined ? 0 : gridSize)}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
