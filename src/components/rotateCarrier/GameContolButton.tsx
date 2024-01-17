import React, { useCallback } from "react";
import router from "next/router";
import {
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import CustomButton from "@/utils/CustomButton";
import { useRecoilState, useResetRecoilState } from "recoil";

interface params {
  level: number;
  nextLevelBtn: boolean;
  setNextLevelBtn: (value: boolean) => void;
}

export default function GameContolButton({
  level,
  nextLevelBtn,
  setNextLevelBtn,
}: params) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const resetSubjuect = useResetRecoilState(SubjectTextState);

  const handleNextLevel = useCallback(() => {
    resetGameState(); // 상태 리셋
    resetSubjuect();
    setNextLevelBtn(false);
    if (level < 9) router.push(`/rotate-carrier/${level + 1}`); // 다음 레벨로 이동
  }, [nextLevelBtn, level]);

  function handleStart() {
    setGameState({ ...gameState, start: true });
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
        type={gameState.start ? "disabled" : "activate"}
      />
      {nextLevelBtn && (
        <>
          <CustomButton
            text="다음 단계"
            onClick={handleNextLevel}
            type="activate"
          />
          <CustomButton
            text="처음으로"
            onClick={handleGameClear}
            type="activate"
          />
        </>
      )}
    </div>
  );
}
