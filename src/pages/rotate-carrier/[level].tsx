import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Canvas from "@/components/rotateCarrier/Canvas";
import { RotateCarrierGameLevels } from "@/assets/rotateCarrier/carrierRotateGameConfig";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  RotateCarrierStage,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import shuffleArray from "@/utils/arrayShuffle";
import {
  FindItemDirection,
  FindItemExist,
} from "@/components/rotateCarrier/index";
import LevelNav from "@/utils/LevelNav";
import FindItemControlButton from "@/components/rotateCarrier/FindItemControlButton";
import { useGameControl } from "@/hooks/rotateCarrier/useGameControl";
import GameContolButton from "@/components/rotateCarrier/GameContolButton";

export default function GamePage() {
  const router = useRouter();
  const level = Number(router.query.level);
  const subject = useRecoilValue(SubjectTextState);
  const setConfig = useSetRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const {
    nextLevelBtn,
    setNextLevelBtn,
    findDirection,
    findItemExist,
    setFindDirection,
    setFindItemExist,
  } = useGameControl(level);

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

    if (level > 9) {
      router.push("/404");
      return;
    }
    if (router.isReady) {
      initConfig();
      resetGameState();
    }
  }, [router.isReady, level]);

  return (
    <div className="flex flex-col-reverse sm:flex-row min-w-[500px] mx-auto px-4 py-5 items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-[60%] p-4 bg-white rounded-xl shadow-md">
          <span className="font-bold text-xl mb-2">{level + 1} 단계</span>
          <p className="whitespace-pre-line text-center align-middle">
            {subject}
          </p>
        </div>
        <FindItemControlButton
          findDirection={findDirection}
          findItemExist={findItemExist}
          setFindDirection={setFindDirection}
          setFindItemExist={setFindItemExist}
          disabled={gameState.start}
        />
        {gameState.stage === RotateCarrierStage.FIND_ITEM && (
          <Canvas key={level} />
        )}
        {gameState.start &&
          gameState.stage === RotateCarrierStage.FIND_DIRECTION && (
            <FindItemDirection key={level} />
          )}
        {gameState.start &&
          gameState.stage === RotateCarrierStage.FIND_EXIST && (
            <FindItemExist key={level} />
          )}
        {((!gameState.start &&
          gameState.stage === RotateCarrierStage.FIND_EXIST) ||
          (!gameState.start &&
            gameState.stage === RotateCarrierStage.FIND_DIRECTION)) && (
          <div className="w-[500px] h-[500px]" />
        )}
        <GameContolButton
          level={level}
          nextLevelBtn={nextLevelBtn}
          setNextLevelBtn={setNextLevelBtn}
          findDirection={findDirection}
          findItemExist={findItemExist}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between h-fit md:ml-16 sm:ml-10 sm:mt-20 mb-10">
        <LevelNav
          game="rotate-carrier"
          curLevel={level}
          disabled={gameState.start}
        />
      </div>
    </div>
  );
}
