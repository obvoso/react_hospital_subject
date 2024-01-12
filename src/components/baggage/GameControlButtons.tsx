import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import {
  BaggageGameConfigState,
  BaggageGameState,
  BaggageItemScore,
} from "@/atoms/baggage/game";
import CustomButton from "@/utils/CustomButton";
import {
  BaggageLevelConfig,
  baggageGameLevels,
} from "@/utils/baggage/baggageGameConfig";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { setShuffleItems } from "./utils/setShuffleItems";

interface GameButtonsProps {
  reset: () => void;
  level: number;
  nextBtn: boolean;
  setNextBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameControlButtons({
  reset,
  level,
  nextBtn,
  setNextBtn,
}: GameButtonsProps) {
  const router = useRouter();
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const resetConfig = useResetRecoilState(BaggageGameConfigState);
  const [config, setConfig] = useRecoilState(BaggageGameConfigState);
  const setItemAnimations = useSetRecoilState(ItemAnimationState);
  const handleStart = useCallback(() => {
    setGameState({ ...gameState, start: true });
  }, [level]);

  const handleNextLevel = useCallback(() => {
    reset();
    if (level < 11) router.push(`/baggage/${level + 1}`); // 다음 레벨로 이동
  }, [nextBtn, level]);

  const handleReStart = useCallback(() => {
    reset();
    setGameState({
      score: 0,
      start: true,
      gameOver: false,
      itemScore: BaggageItemScore.INIT,
    });
    const levelConfig: BaggageLevelConfig = baggageGameLevels[level];
    setConfig(levelConfig);
    setShuffleItems({ config: levelConfig, setItemAnimations });
  }, [level]);

  function handleGameClear() {
    reset();
    resetConfig();
    router.push("/");
  }

  // 게임 클리어
  useEffect(() => {
    if (
      (gameState.score === config.items && level < 11 && gameState.start) ||
      gameState.gameOver
    ) {
      setNextBtn(true);
      setGameState({ ...gameState, start: false, gameOver: false });
    }
  }, [gameState, config, level]);

  return (
    <div className="flex justify-center space-x-4 mt-4">
      {!nextBtn && (
        <CustomButton
          text="게임 시작"
          onClick={handleStart}
          type={gameState.start ? "disabled" : "activate"}
        />
      )}
      {nextBtn && (
        <>
          <CustomButton
            text="다시 시작"
            onClick={handleReStart}
            type="activate"
          />
          <CustomButton
            text="다음 단계"
            onClick={handleNextLevel}
            type="activate"
          />
        </>
      )}
      {level === 11 && gameState.score === config.items && (
        <CustomButton
          text="처음으로"
          onClick={handleGameClear}
          type="activate"
        />
      )}
    </div>
  );
}
