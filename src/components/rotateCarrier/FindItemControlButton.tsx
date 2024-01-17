import React, { useState } from "react";

interface FindItemControlButton {
  findDirection: boolean;
  findItemExist: boolean;
  setFindDirection: (value: boolean) => void;
  setFindItemExist: (value: boolean) => void;
  disabled: boolean;
}

interface params {
  label: string;
  isOn: boolean;
  handleToggle: () => void;
  disabled: boolean;
}

function Toggle({ label, isOn, handleToggle, disabled }: params) {
  return (
    <label className="flex flex-col items-center cursor-pointer w-fit">
      <span className="font-semibold text-gray-700">{label}</span>
      <div className="relative mt-1">
        <input
          type="checkbox"
          className="sr-only"
          checked={isOn}
          onChange={handleToggle}
          disabled={disabled}
        />
        <div
          className={`block bg-gray-400 w-14 h-8 rounded-full ${
            isOn && "bg-blue-400"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
            isOn && "transform translate-x-6"
          }`}
        ></div>
      </div>
    </label>
  );
}

export default function FindItemControlButton({
  findDirection,
  findItemExist,
  setFindDirection,
  setFindItemExist,
  disabled,
}: FindItemControlButton) {
  const buttons = [
    {
      lebel: "물건 위치 찾기",
      state: findItemExist,
      setState: () => setFindItemExist(!findItemExist),
    },
    {
      lebel: "물건 방향 찾기",
      state: findDirection,
      setState: () => setFindDirection(!findDirection),
    },
  ];

  console.log(findDirection);

  return (
    <div className="flex items-center justify-between w-60 p-3 mt-3">
      {buttons.map((button) => (
        <Toggle
          label={button.lebel}
          isOn={button.state}
          handleToggle={button.setState}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
