import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  RotateCarrierStage,
} from "@/atoms/rotateCarrier/config";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function useGameControl(level: number) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [findDirection, setFindDirection] = useState(false);
  const [findItemExist, setFindItemExist] = useState(false);
  const [nextLevelBtn, setNextLevelBtn] = useState(false);

  useEffect(() => {
    setFindDirection(config.findDirection);
    setFindItemExist(config.findExist);
    setNextLevelBtn(false);
  }, [config.level]);

  useEffect(() => {
    if (gameState.directionScore === config.findItems) {
      setNextLevelBtn(true);
      setGameState({ ...gameState, start: false });
    }
  }, [gameState.directionScore, config]);

  useEffect(() => {
    if (
      gameState.stage === RotateCarrierStage.FIND_EXIST &&
      gameState.existScore === config.findItems
    ) {
      if (findDirection)
        setGameState({
          ...gameState,
          stage: RotateCarrierStage.FIND_DIRECTION,
        });
      else {
        setNextLevelBtn(true);
        setGameState({ ...gameState, start: false });
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
        setGameState({ ...gameState, stage: RotateCarrierStage.FIND_EXIST });
      else if (findDirection)
        setGameState({
          ...gameState,
          stage: RotateCarrierStage.FIND_DIRECTION,
        });
      else {
        setNextLevelBtn(true);
        setGameState({ ...gameState, start: false });
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