import { routeGameState } from "@/atoms/route/game";
import CustomButton from "@/utils/CustomButton";
import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function GameControlButton() {
  const [gameStatus, setGameStatus] = useRecoilState(routeGameState);

  const handleRestart = () => {
    setGameStatus({ start: true });
  };

  return (
    <div>
      <CustomButton
        text="다시 시작"
        onClick={handleRestart}
        type={gameStatus.start ? "disabled" : "activate"}
      />
    </div>
  );
}
