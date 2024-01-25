import { routeGameState } from "@/atoms/route/game";
import CustomButton from "@/utils/CustomButton";
import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function GameControlButton() {
  const [gameStatus, setGameStatus] = useRecoilState(routeGameState);

  const handleRestart = () => {
    if (gameStatus.restartCount === 3) window.location.reload();
    else
      setGameStatus({ start: true, restartCount: gameStatus.restartCount + 1 });
  };

  return (
    <div>
      <CustomButton
        text="시작"
        onClick={handleRestart}
        type={gameStatus.start ? "disabled" : "activate"}
      />
    </div>
  );
}
