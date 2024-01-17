import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import { useGameControl } from "@/hooks/rotateCarrier/useGameControl";
import CustomButton from "@/utils/CustomButton";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { FindItemExist, FindItemDirection } from ".";
import router from "next/router";

interface params {
  level: number;
}

export default function GameContolButton({ level }: params) {
  const {
    findDirection,
    findItemExist,
    nextLevelBtn,
    setNextLevelBtn,
    setFindDirection,
    setFindItemExist,
  } = useGameControl(level);
  const config = useRecoilValue(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const resetSubjuect = useResetRecoilState(SubjectTextState);

  const handleNextLevel = useCallback(() => {
    resetGameState(); // 상태 리셋
    resetSubjuect();
    setNextLevelBtn(false);
    setFindDirection(false);
    setFindItemExist(false);
    if (level < 9) router.push(`/rotate-carrier/${level + 1}`); // 다음 레벨로 이동
  }, [nextLevelBtn, level]);

  function handleStart() {
    setGameState({ ...gameState, start: true });
  }

  function handleGameClear() {
    resetGameState(); // 상태 리셋
    resetSubjuect();
    setNextLevelBtn(false);
    setFindDirection(false);
    setFindItemExist(false);
    router.push("/");
  }

  return (
    <div>
      {findItemExist &&
        config.itemExamples &&
        !findDirection &&
        gameState.start && <FindItemExist />}
      {findDirection && config.findDirection && gameState.start && (
        <FindItemDirection />
      )}
      <div className="flex justify-center items-center space-x-4">
        <CustomButton
          text="게임 시작"
          onClick={handleStart}
          type={gameState.start ? "disabled" : "activate"}
        />
        {nextLevelBtn && (
          <CustomButton
            text="다음 단계"
            onClick={handleNextLevel}
            type="activate"
          />
        )}
        {gameState.directionScore === config.findItems &&
          gameState.start &&
          level === 9 && (
            <CustomButton
              text="처음으로"
              onClick={handleGameClear}
              type="activate"
            />
          )}
      </div>
    </div>
  );
}
