import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  RotateCarrierStage,
  currentSelectResultState,
} from "@/atoms/rotateCarrier/config";
import useGameControl from "@/hooks/rotateCarrier/useGameControl";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface props {
  level: number;
  nextLevelBtn: boolean;
  setNextLevelBtn: (value: boolean) => void;
}
export default function CurrentSelectResult({
  level,
  nextLevelBtn,
  setNextLevelBtn,
}: props) {
  const config = useRecoilValue(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [currentSelectResultText, setCurrentSelectResultText] = useState("");
  const [currentSelectResult, setCurrentSelectResult] = useRecoilState(
    currentSelectResultState
  );
  const { handleRestart } = useGameControl({
    level,
    nextLevelBtn,
    setNextLevelBtn,
  });

  useEffect(() => {
    if (!currentSelectResult && gameState.start) {
      setCurrentSelectResultText("아쉬워요!");
      setGameState((prev) => {
        return {
          ...prev,
          start: false,
        };
      });
      // 2초 후에 재시작
      setTimeout(() => {
        setCurrentSelectResult(true);
        setCurrentSelectResultText("");
        handleRestart();
      }, 2000);
    } else if (
      (currentSelectResult &&
        gameState.start &&
        gameState.stage === RotateCarrierStage.FIND_ITEM &&
        gameState.score === config.findItems) ||
      (gameState.stage === RotateCarrierStage.FIND_DIRECTION &&
        gameState.directionScore === config.findItems) ||
      (gameState.stage === RotateCarrierStage.FIND_EXIST &&
        gameState.existScore === config.findItems)
    ) {
      setCurrentSelectResultText("좋아요!");
      // 2초동안 문자 보여주기
      setTimeout(() => {
        setCurrentSelectResultText("");
      }, 2000);
    }
  }, [currentSelectResult, gameState]);
  return (
    <>
      {currentSelectResultText.length !== 0 && (
        <div className="flex absolute items-center justify-center w-full h-full cursor-not-allowed">
          <div className="text-bg">
            <span
              className={`selectScore font-bold text-[2.2rem] mb-[120px] ${
                currentSelectResultText === "아쉬워요!" ? "wrong" : "correct"
              }`}
            >
              {currentSelectResultText}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
