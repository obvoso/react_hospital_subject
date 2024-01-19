import React from "react";

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
      <span className="text-sm sm:text-base font-semibold text-gray-700">
        {label}
      </span>
      <div className={`relative mt-1 ${disabled && "cursor-not-allowed"}`}>
        <input
          type="checkbox"
          className="sr-only"
          checked={isOn}
          onChange={handleToggle}
          disabled={disabled}
        />
        <div
          className={`block w-12 sm:w-14 h-6 sm:h-8 rounded-full ${
            isOn ? "bg-blue-400" : "bg-gray-400"
          }`}
        />
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 sm:w-6 sm:h-6 rounded-full transition ${
            isOn && "transform translate-x-6"
          }`}
        />
      </div>
    </label>
  );
}

function FindItemControlButton({
  findDirection,
  findItemExist,
  setFindDirection,
  setFindItemExist,
  disabled,
}: FindItemControlButton) {
  const buttons = [
    {
      lebel: "들어있던 물건 찾기",
      state: findItemExist,
      setState: () => setFindItemExist(!findItemExist),
    },
    {
      lebel: "물건 방향 찾기",
      state: findDirection,
      setState: () => setFindDirection(!findDirection),
    },
  ];

  React.memo(Toggle);

  return (
    <div className="flex items-center justify-between w-60 sm:w-72 p-3 mt-3">
      {buttons.map((button, index) => (
        <Toggle
          label={button.lebel}
          isOn={button.state}
          handleToggle={button.setState}
          disabled={disabled}
          key={index}
        />
      ))}
    </div>
  );
}

export default React.memo(FindItemControlButton);
