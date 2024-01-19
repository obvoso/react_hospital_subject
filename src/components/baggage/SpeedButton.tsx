import { BaggageGameConfigState, GameSpeed } from "@/atoms/baggage/game";
import { BaggageSpeed } from "@/utils/baggage/baggageGameConfig";
import React, { use, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function SpeedButton() {
  const speed = ["느림", "보통", "빠름"];
  const [currentSpeed, setCurrentSpeed] = useRecoilState(GameSpeed);
  const config = useRecoilValue(BaggageGameConfigState);

  useEffect(() => {
    setCurrentSpeed(config?.speed);
  }, [config?.speed]);

  const isClicked = (speed: string) => {
    if (speed === "느림") return currentSpeed === BaggageSpeed.SLOW;
    else if (speed === "보통") return currentSpeed === BaggageSpeed.MEDIUM;
    else if (speed === "빠름") return currentSpeed === BaggageSpeed.FAST;
  };

  const handleSetSpeed = (speed: string) => {
    if (speed === "느림") setCurrentSpeed(BaggageSpeed.SLOW);
    else if (speed === "보통") setCurrentSpeed(BaggageSpeed.MEDIUM);
    else if (speed === "빠름") setCurrentSpeed(BaggageSpeed.FAST);
  };

  return (
    <div className="flex sm:flex-col flex-row bg-white shadow-lg rounded-2xl p-3 w-fit h-fit z-10">
      {speed.map((speed) => (
        <button
          className={`${
            isClicked(speed) ? "bg-blue-500" : "bg-blue-200"
          } hover:bg-blue-400 text-white text-sm font-semibold py-1 px-2 sm:my-1 mx-1 rounded w-14 shadow-md`}
          key={speed}
          onClick={() => handleSetSpeed(speed)}
        >
          {speed}
        </button>
      ))}
    </div>
  );
}
