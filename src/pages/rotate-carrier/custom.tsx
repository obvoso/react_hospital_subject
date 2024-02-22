import React from "react";
import { RotateCarrierStage } from "@/atoms/rotateCarrier/config";
import { FindItemDirection, FindItemExist } from "@/components/rotateCarrier";
import { useCustom } from "@/hooks/rotateCarrier/useCustom";
import { useCustomGameControl } from "@/hooks/rotateCarrier/useCustomGameContol";
import CustomButtons from "@/components/customRotateCarrier/CustomButtons";
import GameContolButton from "@/components/customRotateCarrier/GameContolButton";
import Canvas from "@/components/rotateCarrier/Canvas";
import CurrentSelectResult from "@/components/rotateCarrier/CurrentSelectResult";

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
    setRotateAngle,
    gameState,
  } = useCustom();

  const {
    findDirection,
    findItemExist,
    nextLevelBtn,
    setNextLevelBtn,
    setFindDirection,
    // setFindItemExist,
  } = useCustomGameControl({
    level,
  });

  return (
    <div className="flex flex-col-reverse sm:flex-row min-w-[500px] mx-auto px-4 py-5 items-center justify-center">
      <div className="flex relative flex-col items-center">
        <CustomButtons
          gridSize={gridSize}
          obstacleSize={obstacle}
          itemSize={findItem.length}
          rotate={rotate}
          findDirection={findDirection}
          // findExist={findItemExist}
          setFindDirection={setFindDirection}
          // setFindExist={setFindItemExist}
          setGridSize={setGridSize}
          setObstacle={setObstacle}
          setFindItem={setFindItem}
          setRotate={setRotate}
          setRotateAngle={setRotateAngle}
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
