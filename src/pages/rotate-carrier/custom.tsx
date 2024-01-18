import { RotateCarrierStage } from "@/atoms/rotateCarrier/config";
import { DropDownButton } from "@/components/customBaggage/DropDownButton";
import CustomButtons from "@/components/customRotateCarrier/CustomButtons";
import SelectsDropDown from "@/components/customRotateCarrier/SelectsDropDown";
import { FindItemDirection, FindItemExist } from "@/components/rotateCarrier";
import Canvas from "@/components/rotateCarrier/Canvas";
import FindItemControlButton from "@/components/rotateCarrier/FindItemControlButton";
import GameContolButton from "@/components/customRotateCarrier/GameContolButton";
import { useCustom } from "@/hooks/rotateCarrier/useCustom";
import { useCustomGameControl } from "@/hooks/rotateCarrier/useCustomGameContol";
import { ANGLE } from "@/utils/carrierRotation/carrierRotateGameConfig";
import React, { useState } from "react";

export default function CustomGamePage() {
  const {
    level,
    gridSize,
    setGridSize,
    findItem,
    setFindItem,
    obstacle,
    setObstacle,
    rotate,
    setRotate,
    rotateAngle,
    setRotateAngle,
    gameState,
    setGameState,
  } = useCustom();

  const {
    findDirection,
    findItemExist,
    nextLevelBtn,
    setNextLevelBtn,
    setFindDirection,
    setFindItemExist,
  } = useCustomGameControl({
    level,
  });

  return (
    <div className="flex flex-col-reverse sm:flex-row min-w-[500px] mx-auto px-4 py-5 items-center">
      <div className="flex flex-col items-center">
        <CustomButtons
          gridSize={gridSize}
          obstacleSize={obstacle}
          itemSize={findItem.length}
          findDirection={findDirection}
          findExist={findItemExist}
          setFindDirection={setFindDirection}
          setFindExist={setFindItemExist}
          setGridSize={setGridSize}
          setObstacle={setObstacle}
          setFindItem={setFindItem}
          setRotate={setRotate}
          setRotateAngle={setRotateAngle}
        />
        {gameState.stage === RotateCarrierStage.FIND_ITEM && (
          <Canvas key={level} />
        )}
        {gameState.stage === RotateCarrierStage.FIND_DIRECTION && (
          <FindItemDirection key={level} />
        )}
        {gameState.stage === RotateCarrierStage.FIND_EXIST && (
          <FindItemExist key={level} />
        )}

        <GameContolButton
          level={level}
          nextLevelBtn={nextLevelBtn}
          setNextLevelBtn={setNextLevelBtn}
        />
      </div>
    </div>
  );
}
