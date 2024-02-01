import React, { useCallback } from "react";
import router from "next/router";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  RotateCarrierStage,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import CustomButton from "@/utils/CustomButton";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { RotateCarrierGameLevels } from "@/assets/rotateCarrier/carrierRotateGameConfig";
import shuffleArray from "@/utils/arrayShuffle";

interface params {
  level: number;
  nextLevelBtn: boolean;
  setNextLevelBtn: (value: boolean) => void;
  findDirection: boolean;
  findItemExist: boolean;
}

export default function GameContolButton({
  level,
  nextLevelBtn,
  setNextLevelBtn,
  findDirection,
  findItemExist,
}: params) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const resetSubjuect = useResetRecoilState(SubjectTextState);
  const setConfig = useSetRecoilState(RotateCarrierConfigState);

  const handleNextLevel = useCallback(() => {
    resetGameState(); // 상태 리셋
    resetSubjuect();
    setNextLevelBtn(false);
    if (level < 9) router.push(`/rotate-carrier/${level + 1}`); // 다음 레벨로 이동
  }, [nextLevelBtn, level]);

  function handleStart() {
    setGameState({ ...gameState, start: true });
  }

  function handleRestart() {
    const levelConfig = RotateCarrierGameLevels[level];
    const shuffleAngle = shuffleArray(levelConfig.rotationAngle);
    const shuffleExistItem = shuffleArray(levelConfig.itemExamples);
    const shuffleDirectionItem = levelConfig.dirrectionExamples.map((item) => {
      return {
        ...item,
        items: shuffleArray(item.items),
      };
    });
    setConfig({
      ...levelConfig,
      findDirection: findDirection,
      findExist: findItemExist,
      rotationAngle: shuffleAngle,
      itemExamples: shuffleExistItem,
      dirrectionExamples: shuffleDirectionItem,
    });
    setGameState({
      stage: RotateCarrierStage.FIND_ITEM,
      score: 0,
      directionScore: 0,
      existScore: 0,
      start: true,
      lastAngle: 0,
      lastDirection: 0,
    });
    setNextLevelBtn(false);
  }

  function handleGameClear() {
    resetGameState(); // 상태 리셋
    resetSubjuect();
    setNextLevelBtn(false);
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center space-x-4">
      <CustomButton
        text="게임 시작"
        onClick={handleStart}
        type={!gameState.start && !nextLevelBtn ? "activate" : "disabled"}
      />
      {nextLevelBtn && level < 10 && (
        <CustomButton
          text="다음 단계"
          onClick={handleNextLevel}
          type="activate"
        />
      )}
      {nextLevelBtn && (
        <CustomButton
          text="처음으로"
          onClick={handleGameClear}
          type="activate"
        />
      )}
      {nextLevelBtn && !gameState.start && (
        <CustomButton
          text="다시 시작"
          onClick={handleRestart}
          type="activate"
        />
      )}
    </div>
  );
}
