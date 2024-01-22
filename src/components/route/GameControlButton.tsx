import { routeGameState } from "@/atoms/route/game";
import CustomButton from "@/utils/CustomButton";
import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function GameControlButton() {
  const [gameStatus, setGameStatus] = useRecoilState(routeGameState);

  const handleRestart = () => {
    setGameStatus({ start: true, scored: false });
  };

  return (
    <div>
      <CustomButton
        text="시작"
        onClick={handleRestart}
        type={gameStatus.scored ? "activate" : "disabled"}
      />
    </div>
  );
}
