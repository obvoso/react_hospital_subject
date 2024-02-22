import { useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import router from "next/router";
import shuffleArray from "@/utils/arrayShuffle";
import {
  RotateCarrierSpacePoint,
  RotateCarrierItemAssets,
  ITEMLEVEL,
} from "@/assets/rotateCarrier/carrierRotateGameConfig";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  RotateCarrierStage,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";

interface params {
  level: number;
  nextLevelBtn: boolean;
  setNextLevelBtn: (value: boolean) => void;
}

export default function useGameControl({
  level,
  nextLevelBtn,
  setNextLevelBtn,
}: params) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const resetSubjuect = useResetRecoilState(SubjectTextState);

  function shuffleQuestionArray(randomIndex: RotateCarrierSpacePoint[]) {
    const findItemArray: RotateCarrierItemAssets[] = [];
    for (let i = 0; i < config.questions.length; i++) {
      if (config.space.length === 2)
        findItemArray.push({
          imageKey: config.questions[i].imageKey,
          point: {
            ...randomIndex[i],
            x: randomIndex[i].x + 40,
            w: 90,
            h: 90,
          },
        });
      else if (config.space.length === 4)
        findItemArray.push({
          imageKey: config.questions[i].imageKey,
          point: {
            x: randomIndex[i].x + 10,
            y: randomIndex[i].y + 15,
            w: 65,
            h: 65,
          },
        });
      else
        findItemArray.push({
          imageKey: config.questions[i].imageKey,
          point: {
            x: randomIndex[i].x + 15,
            y: randomIndex[i].y + 10,
            w: 50,
            h: 50,
          },
        });
    }
    return findItemArray;
  }

  // const shuffleObstacleArray = (randomIndex: RotateCarrierSpacePoint[]) => {
  //   const obstacleArray: RotateCarrierItemAssets[] = [];

  //   for (
  //     let i = config.questions.length, j = 0;
  //     j < config.obstacle;
  //     i++, j++
  //   ) {
  //     if (config.space.length === 2) {
  //       obstacleArray.push({
  //         imageKey: `obstacle${j}`,
  //         point: {
  //           ...randomIndex[i],
  //           x: randomIndex[i].x + 30,
  //           w: 90,
  //           h: 90,
  //         },
  //       });
  //     } else if (config.space.length === 4)
  //       obstacleArray.push({
  //         imageKey: `obstacle${j}`,
  //         point: {
  //           x: randomIndex[i].x + 10,
  //           y: randomIndex[i].y + 20,
  //           w: 60,
  //           h: 60,
  //         },
  //       });
  //     else
  //       obstacleArray.push({
  //         imageKey: `obstacle${j}`,
  //         point: {
  //           x: randomIndex[i].x + 15,
  //           y: randomIndex[i].y + 10,
  //           w: 50,
  //           h: 50,
  //         },
  //       });
  //   }
  //   return obstacleArray;
  // };

  //ㄱㅃㅊㄷ................ㅋ
  const setAnswerDirection = (randomIndex: RotateCarrierSpacePoint[]) => {
    const direction: number[] = [];
    for (let i = 0; i < config.questions.length; i++) {
      if (config.space.length === 2) {
        if (randomIndex[i].y === -70) direction.push(0);
        else direction.push(1);
      } else if (config.space.length === 4) {
        if (randomIndex[i].x === -85 && randomIndex[i].y === -70)
          direction.push(0);
        else if (randomIndex[i].x === -85 && randomIndex[i].y === 30)
          direction.push(1);
        else if (randomIndex[i].x === -2.5 && randomIndex[i].y === -70)
          direction.push(2);
        else direction.push(3);
      } else {
        if (randomIndex[i].x === -85 && randomIndex[i].y === -70)
          direction.push(0);
        else if (randomIndex[i].x === -85 && randomIndex[i].y === -5)
          direction.push(1);
        else if (randomIndex[i].x === -85 && randomIndex[i].y === 60)
          direction.push(2);
        else if (randomIndex[i].x === -2.5 && randomIndex[i].y === -70)
          direction.push(3);
        else if (randomIndex[i].x === -2.5 && randomIndex[i].y === -5)
          direction.push(4);
        else direction.push(5);
      }
    }
    return direction;
  };

  function handleRestart() {
    const randomIndex = shuffleArray(config.space);
    const shuffleAngle = shuffleArray(config.rotationAngle);
    // const shuffleExistItem = shuffleArray(config.itemExamples);
    const shuffleQuestion = shuffleQuestionArray(randomIndex);
    // const shuffleObstacles = shuffleObstacleArray(randomIndex);
    const answerDirection = setAnswerDirection(randomIndex);
    const shuffleDirectionItem = config.dirrectionExamples.map((item) => {
      return {
        ...item,
        items: shuffleArray(item.items),
      };
    });
    setConfig({
      ...config,
      answerDirection,
      questions: shuffleQuestion,
      // obstacles: shuffleObstacles,
      rotationAngle: shuffleAngle,
      // itemExamples: shuffleExistItem,
      dirrectionExamples: shuffleDirectionItem,
    });
    setGameState({
      stage: RotateCarrierStage.FIND_ITEM,
      score: 0,
      directionScore: 0,
      existScore: 0,
      start: true,
      lastAngle: 0,
      lastDirection: -1,
    });
    setNextLevelBtn(false);
  }

  const handleNextLevel = useCallback(() => {
    resetGameState(); // 상태 리셋
    resetSubjuect();
    setNextLevelBtn(false);
    if (level < 10) router.push(`/rotate-carrier/${level + 1}`); // 다음 레벨로 이동
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

  return { handleRestart, handleNextLevel, handleStart, handleGameClear };
}
