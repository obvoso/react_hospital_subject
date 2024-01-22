import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import shuffleArray from "@/utils/arrayShuffle";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
} from "@/atoms/rotateCarrier/config";
import {
  carrier,
  space,
  RotateCarrierItemAssets,
  DirectionGroups,
  DirectionGroup,
} from "@/assets/rotateCarrier/carrierRotateGameConfig";

export const useCustom = () => {
  const [gridSize, setGridSize] = useState(2);
  const [findItem, setFindItem] = useState<string[]>([]);
  const [obstacle, setObstacle] = useState(0);
  const [rotate, setRotate] = useState(1);
  const [rotateAngle, setRotateAngle] = useState<number[]>([1]);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const resetConfig = useResetRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const [level, setLevel] = useState(0);
  const [randomIndex, setRandomIndex] = useState<number[]>([0, 1]);

  useEffect(() => {
    switch (gridSize) {
      case 2:
        setRandomIndex(shuffleArray([0, 1]));
        break;
      case 4:
        setRandomIndex(shuffleArray([0, 1, 2, 3]));
        break;
      case 6:
        setRandomIndex(shuffleArray([0, 1, 2, 3, 4, 5]));
        break;
    }
    return () => {
      resetConfig();
      setObstacle(0);
      setFindItem([]);
    };
  }, [gridSize]);

  useEffect(() => {
    setLevel(9 + gridSize + obstacle + rotate + findItem.length);
    setConfig({
      level: 9 + gridSize + obstacle + rotate + findItem.length,
      findItems: findItem.length,
      obstacle: obstacle,
      findDirection: config.findDirection,
      findExist: config.findDirection,
      answerDirection: initAnswerDirection(randomIndex),
      space: initGrid(),
      rotation: rotate,
      rotationAngle: initRotateAngle(),
      carrier: { imageKey: "carrier", point: carrier },
      questions: initFindItem(randomIndex, findItem),
      obstacles: initObstacle(randomIndex),
      itemExamples: initItemExamples(),
      dirrectionExamples: initDirectionExamples(),
    });

    resetGameState();
  }, [randomIndex, findItem, obstacle, rotate, rotateAngle]);

  const initGrid = () => {
    switch (gridSize) {
      case 2:
        return [space[0], space[1]];
      case 4:
        return [space[2], space[3], space[4], space[5]];
      case 6:
        return [space[6], space[7], space[8], space[9], space[10], space[11]];
    }
    return [];
  };

  const initAnswerDirection = (randomIndex: number[]) => {
    const direction: number[] = [];
    for (let i = 0; i < findItem.length; i++) {
      direction.push(randomIndex[i]);
    }
    return direction;
  };

  const initFindItem = (randomIndex: number[], findItem: string[]) => {
    if (randomIndex.length < findItem.length) return [];
    const findItemArray: RotateCarrierItemAssets[] = [];
    const indexCorrection = gridSize === 2 ? 0 : gridSize === 4 ? 2 : 6;
    for (let i = 0; i < findItem.length; i++) {
      if (gridSize === 2)
        findItemArray.push({
          imageKey: findItem[i],
          point: {
            ...space[randomIndex[i] + indexCorrection],
            x: space[randomIndex[i] + indexCorrection].x + 40,
            w: 90,
            h: 90,
          },
        });
      else if (gridSize === 4)
        findItemArray.push({
          imageKey: findItem[i],
          point: {
            x: space[randomIndex[i] + indexCorrection].x + 10,
            y: space[randomIndex[i] + indexCorrection].y + 15,
            w: 65,
            h: 65,
          },
        });
      else
        findItemArray.push({
          imageKey: findItem[i],
          point: {
            x: space[randomIndex[i] + indexCorrection].x + 15,
            y: space[randomIndex[i] + indexCorrection].y + 10,
            w: 50,
            h: 50,
          },
        });
    }
    return findItemArray;
  };

  const initRotateAngle = () => {
    const rotateAngleArr: number[] = [];
    for (let i = 0; i < rotate; i++) {
      if (rotateAngle[i] === undefined) rotateAngleArr.push(rotateAngle[0]);
      else rotateAngleArr.push(rotateAngle[i]);
    }
    return rotateAngleArr;
  };

  const initObstacle = (randomIndex: number[]) => {
    const indexCorrection = gridSize === 2 ? 0 : gridSize === 4 ? 2 : 6;
    const obstacleArray: RotateCarrierItemAssets[] = [];
    for (let i = findItem.length, j = 0; j < obstacle; i++, j++) {
      if (gridSize === 2) {
        obstacleArray.push({
          imageKey: `obstacle${j}`,
          point: {
            ...space[randomIndex[i] + indexCorrection],
            x: space[randomIndex[i] + indexCorrection].x + 30,
            w: 90,
            h: 90,
          },
        });
      } else if (gridSize === 4)
        obstacleArray.push({
          imageKey: `obstacle${j}`,
          point: {
            x: space[randomIndex[i] + indexCorrection].x + 10,
            y: space[randomIndex[i] + indexCorrection].y + 20,
            w: 60,
            h: 60,
          },
        });
      else
        obstacleArray.push({
          imageKey: `obstacle${j}`,
          point: {
            x: space[randomIndex[i] + indexCorrection].x + 15,
            y: space[randomIndex[i] + indexCorrection].y + 10,
            w: 50,
            h: 50,
          },
        });
    }
    return obstacleArray;
  };

  const initItemExamples = () => {
    const itemExamples: string[] = [];
    for (let i = 0; i < findItem.length; i++) {
      itemExamples.push(findItem[i]);
    }
    for (let i = 0; i < 4 - findItem.length; i++) {
      itemExamples.push(`obstacle${i}`);
    }
    return shuffleArray(itemExamples);
  };

  const initDirectionExamples = () => {
    const directionExamples: DirectionGroups[] = [];
    for (let i = 0; i < findItem.length; i++) {
      const group: DirectionGroup[] = [];
      const image = findItem[i].split("_")[0];
      for (let j = 0, k = 0; j <= 270; j += 90, k++) {
        group.push({
          index: k,
          imageKey: `${image}_${j}`,
        });
      }
      directionExamples.push({ items: shuffleArray(group) });
    }
    return directionExamples;
  };

  return {
    level,
    gridSize,
    setGridSize,
    findItem,
    setFindItem,
    obstacle,
    setObstacle,
    setRotate,
    setRotateAngle,
    gameState,
  };
};
