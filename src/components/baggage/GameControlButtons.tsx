import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import { setShuffleItems } from "./utils/setShuffleItems";
import CustomButton from "@/utils/CustomButton";
import {
  BaggageGameConfigState,
  BaggageGameState,
  BaggageScore,
} from "@/atoms/baggage/game";
import {
  BaggageLevelConfig,
  baggageGameLevels,
} from "@/utils/baggage/baggageGameConfig";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

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
  const score = useRecoilValue(BaggageScore);
  const resetScore = useResetRecoilState(BaggageScore);

  const handleStart = useCallback(() => {
    setGameState({ ...gameState, start: true });
  }, [level, config]);

  const handleNextLevel = useCallback(() => {
    reset();
    if (level < 11) router.push(`/baggage/${level + 1}`); // 다음 레벨로 이동
  }, [nextBtn, level]);

  const handleReStart = useCallback(() => {
    reset();
    resetScore();
    setGameState({
      start: true,
      gameOver: false,
    });

    const levelConfig: BaggageLevelConfig = baggageGameLevels[level];
    if (levelConfig) {
      setConfig(levelConfig);
      setShuffleItems({ config: levelConfig, setItemAnimations });
    } else {
      setShuffleItems({ config, setItemAnimations });
    }
  }, [level]);

  function handleGameClear() {
    reset();
    resetConfig();
    router.push("/");
  }

  // 게임 클리어
  useEffect(() => {
    if (!gameState.start) return;
    if (score === config.items || gameState.gameOver) {
      setGameState({ start: false, gameOver: false });
      setNextBtn(true);
    }
  }, [score, gameState.gameOver, gameState.start, config, level]);

  return (
    <div className="flex justify-center space-x-4">
      {!nextBtn && !gameState.gameOver && (
        <CustomButton
          text="게임 시작"
          onClick={handleStart}
          type={gameState.start ? "disabled" : "activate"}
        />
      )}
      {nextBtn && (
        <>
          <CustomButton
            text="처음으로"
            onClick={handleGameClear}
            type="activate"
          />
          <CustomButton
            text="다시 시작"
            onClick={handleReStart}
            type="activate"
          />
        </>
      )}
      {nextBtn && level < 11 && (
        <CustomButton
          text="다음 단계"
          onClick={handleNextLevel}
          type="activate"
        />
      )}
    </div>
  );
}
