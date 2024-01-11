import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Canvas from "@/components/rotateCarrier/Canvas";
import { RotateCarrierGameLevels } from "@/utils/carrierRotation/carrierRotateGameConfig";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import shuffleArray from "@/utils/arrayShuffle";
import CustomButton from "@/utils/CustomButton";
import {
  FindItemDirection,
  FindItemExist,
} from "@/components/rotateCarrier/index";

export default function GamePage() {
  const router = useRouter();
  const level = Number(router.query.level);
  const subject = useRecoilValue(SubjectTextState);
  const resetSubjuect = useResetRecoilState(SubjectTextState);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const [nextLevelBtn, setNextLevelBtn] = useState(false);
  const [findDirection, setFindDirection] = useState(false);
  const [findItemExist, setFindItemExist] = useState(false);

  useEffect(() => {
    const initConfig = () => {
      const levelConfig = RotateCarrierGameLevels[level];
      const shuffleAngle = shuffleArray(levelConfig.rotationAngle);
      const shuffleExistItem = shuffleArray(levelConfig.itemExamples);
      const shuffleDirectionItem = levelConfig.dirrectionExamples.map(
        (item) => {
          return {
            ...item,
            items: shuffleArray(item.items),
          };
        }
      );
      setConfig({
        ...levelConfig,
        rotationAngle: shuffleAngle,
        itemExamples: shuffleExistItem,
        dirrectionExamples: shuffleDirectionItem,
      });
    };

    if (router.isReady) initConfig();
  }, [router.isReady, level]);

  useEffect(() => {
    if (gameState.directionScore === config.findItems && level < 9)
      setNextLevelBtn(true);
  }, [gameState.directionScore]);

  useEffect(() => {
    if (gameState.itemScore === config.findItems) {
      setFindDirection(true);
    }
  }, [gameState.itemScore]);

  // 게임 클리어
  useEffect(() => {
    if (gameState.score === config.findItems && gameState.start) {
      if (config.itemExamples.length && !gameState.itemScore) {
        setFindItemExist(true);
        return;
      }
      if (config.findDirection && !gameState.directionScore) {
        setFindDirection(true);
        return;
      }
      if (level < 9) setNextLevelBtn(true);
    }
  }, [gameState.score, router, level]);

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
    <div className="flex flex-col min-w-[500px] mx-auto px-4 py-5 items-center">
      <div className="flex flex-col items-center justify-center w-[60%] p-4 bg-white rounded-xl shadow-md">
        <span className="font-bold text-xl mb-2">{level + 1} 단계</span>
        <div className="flex items-center justify-center min-h-12 w-full">
          <p className="whitespace-pre-line text-center align-middle">
            {subject}
          </p>
        </div>
      </div>
      {!findDirection && !findItemExist && <Canvas key={level} />}
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
