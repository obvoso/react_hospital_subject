import React from "react";
import { Toggle } from "@/utils/Toggle";

interface FindItemControlButton {
  findDirection: boolean;
  findItemExist: boolean;
  setFindDirection: (value: boolean) => void;
  setFindItemExist: (value: boolean) => void;
  disabled: boolean;
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
