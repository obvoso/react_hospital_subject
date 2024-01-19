import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  RotateCarrierStage,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

interface params {
  level: number;
}

export function useCustomGameControl({ level }: params) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [findDirection, setFindDirection] = useState(false);
  const [findItemExist, setFindItemExist] = useState(false);
  const [nextLevelBtn, setNextLevelBtn] = useState(false);
  const setSubject = useSetRecoilState(SubjectTextState);

  useEffect(() => {
    setNextLevelBtn(false);
  }, [config.level]);

  useEffect(() => {
    if (config.findItems && gameState.directionScore === config.findItems) {
      setNextLevelBtn(true);
      setGameState({ ...gameState, start: false });
      setSubject("맞추셨습니다!");
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
        setSubject("맞추셨습니다!");
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
        setSubject("맞추셨습니다!");
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
