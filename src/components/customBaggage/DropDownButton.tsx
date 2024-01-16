import { BaggageSpeed } from "@/utils/baggage/baggageGameConfig";
import React from "react";

interface DropDownButtonProps {
  label: string;
  options: { label: string; value: any }[];
  onChange: (value: number) => void;
}

export const DropDownButton = ({
  label,
  options,
  onChange,
}: DropDownButtonProps) => {
  const handleChange = (event: any) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="mb-4 w-fit px-3 ">
      <label
        className="block text-gray-500 text-base font-semibold mb-2 text-center"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow focus:outline-none focus:shadow-outline text-center"
        id={label}
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
