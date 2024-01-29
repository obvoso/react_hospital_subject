import React from "react";

interface DropDownButtonProps {
  label: string;
  options: { label: string; value: any }[];
  onChange: (value: number) => void;
  curValue: any;
}

export const DropDownButton = ({
  label,
  options,
  onChange,
  curValue,
}: DropDownButtonProps) => {
  const handleChange = (event: any) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="mb-4 w-fit px-3">
      <label
        className="block text-gray-500 text-sm font-semibold mb-2 text-center"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        className="block appearance-none w-full text-sm bg-white border border-gray-300 hover:border-gray-500 px-3 py-1 rounded shadow focus:outline-none focus:shadow-outline text-center"
        id={label}
        value={curValue}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
