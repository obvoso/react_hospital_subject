import React, { useEffect, useRef } from "react";
import {
  RotateCarrierGameState,
  RotateCarrierStage,
} from "@/atoms/rotateCarrier/config";
import {
  FindItemDirection,
  FindItemExist,
  preLoadImages,
} from "@/components/rotateCarrier";
import { useCustom } from "@/hooks/rotateCarrier/useCustom";
import { useCustomGameControl } from "@/hooks/rotateCarrier/useCustomGameContol";
import CustomButtons from "@/components/customRotateCarrier/CustomButtons";
import GameContolButton from "@/components/customRotateCarrier/GameContolButton";
import Canvas from "@/components/rotateCarrier/Canvas";
import CurrentSelectResult from "@/components/rotateCarrier/CurrentSelectResult";
import { useRecoilValue } from "recoil";

export default function CustomGamePage() {
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const gameState = useRecoilValue(RotateCarrierGameState);
  const { level } = useCustom();
  const { findDirection, nextLevelBtn, setNextLevelBtn, setFindDirection } =
    useCustomGameControl({
      level,
    });

  useEffect(() => {
    preLoadImages(images);
  }, []);

  return (
    <div className="flex flex-col-reverse sm:flex-row min-w-[500px] mx-auto px-4 py-5 items-center justify-center">
      <div className="flex relative flex-col items-center">
        <CustomButtons
          findDirection={findDirection}
          setFindDirection={setFindDirection}
        />
        {gameState.stage === RotateCarrierStage.FIND_ITEM && (
          <Canvas key={level} images={images} />
        )}
        {gameState.start &&
          gameState.stage === RotateCarrierStage.FIND_DIRECTION && (
            <FindItemDirection key={level} />
          )}
        {/* {gameState.start &&
          gameState.stage === RotateCarrierStage.FIND_EXIST && (
            <FindItemExist key={level} />
          )} */}
        {((!gameState.start &&
          gameState.stage === RotateCarrierStage.FIND_EXIST) ||
          (!gameState.start &&
            gameState.stage === RotateCarrierStage.FIND_DIRECTION)) && (
          <div className="w-[500px] h-[500px]" />
        )}
        <GameContolButton
          nextLevelBtn={nextLevelBtn}
          setNextLevelBtn={setNextLevelBtn}
        />
        <CurrentSelectResult
          level={level}
          nextLevelBtn={nextLevelBtn}
          setNextLevelBtn={setNextLevelBtn}
        />
      </div>
    </div>
  );
}
