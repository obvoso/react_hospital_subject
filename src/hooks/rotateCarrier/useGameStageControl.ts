import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  RotateCarrierStage,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export function useGameStageControl(level: number) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [findDirection, setFindDirection] = useState(false);
  const [findItemExist, setFindItemExist] = useState(false);
  const [nextLevelBtn, setNextLevelBtn] = useState(false);
  const setSubject = useSetRecoilState(SubjectTextState);

  useEffect(() => {
    setFindDirection(config.findDirection);
    // setFindItemExist(config.findExist);
    setNextLevelBtn(false);
  }, [config.level]);

  useEffect(() => {
    if (gameState.directionScore === config.findItems) {
      setNextLevelBtn(true);
      setGameState({ ...gameState, start: false });
      setSubject("맞히셨습니다!");
    }
  }, [gameState.directionScore, config]);

  useEffect(() => {
    if (
      gameState.stage === RotateCarrierStage.FIND_EXIST &&
      gameState.existScore === config.findItems
    ) {
      if (findDirection)
        setTimeout(() => {
          setGameState({
            ...gameState,
            stage: RotateCarrierStage.FIND_DIRECTION,
          });
        }, 2000);
      else {
        setNextLevelBtn(true);
        setGameState({ ...gameState, start: false });
        setSubject("맞히셨습니다!");
      }
    }
  }, [gameState.existScore, findDirection]);

  // 캐리어 물건 찾으면
  useEffect(() => {
    if (
      gameState.score === config.findItems &&
      gameState.start &&
      gameState.stage === RotateCarrierStage.FIND_ITEM
    ) {
      if (findItemExist)
        setTimeout(() => {
          setGameState({ ...gameState, stage: RotateCarrierStage.FIND_EXIST });
        }, 2000);
      else if (findDirection)
        setTimeout(() => {
          setGameState({
            ...gameState,
            stage: RotateCarrierStage.FIND_DIRECTION,
          });
        }, 2000);
      else {
        setNextLevelBtn(true);
        setGameState({ ...gameState, start: false });
        setSubject("맞히셨습니다!");
      }
    }
  }, [gameState.score, level, findItemExist, findDirection]);

  return {
    findDirection,
    findItemExist,
    nextLevelBtn,
    setNextLevelBtn,
    setFindDirection,
    setFindItemExist,
  };
}
