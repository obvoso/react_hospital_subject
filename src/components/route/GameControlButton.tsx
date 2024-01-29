import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { customRouteState } from "@/atoms/route/custom";
import { routeGameState } from "@/atoms/route/game";
import CustomButton from "@/utils/CustomButton";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface GameControlButtonProps {
  level: number;
}

export default function GameControlButton({ level }: GameControlButtonProps) {
  const router = useRouter();
  const [gameStatus, setGameStatus] = useRecoilState(routeGameState);

  const handleRestart = () => {
    setGameStatus({ start: true });
  };

  const handleNextPractice = () => {
    router.push(`/route/${level + 1}`);
  };

  const handleExitPractice = () => {
    router.push(`/route/3`);
  };

  return (
    <div className="flex gap-x-3">
      {level > 13 && (
        <CustomButton
          text="시작"
          onClick={handleRestart}
          type={gameStatus.start ? "disabled" : "activate"}
        />
      )}
      {level !== 11 && level <= 12 && (
        <CustomButton
          text="다시 시작"
          onClick={handleRestart}
          type={gameStatus.start ? "disabled" : "activate"}
        />
      )}
      {level === 11 && (
        <CustomButton
          text="연습하기"
          onClick={handleNextPractice}
          type={gameStatus.start ? "disabled" : "activate"}
        />
      )}
      {level === 12 && (
        <CustomButton
          text="연습 종료"
          onClick={handleExitPractice}
          type={gameStatus.start ? "disabled" : "activate"}
        />
      )}
    </div>
  );
}
