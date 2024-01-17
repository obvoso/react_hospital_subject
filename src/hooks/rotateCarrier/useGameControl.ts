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
  const [findDirection, setFindDirection] = useState(config.findDirection);
  const [findItemExist, setFindItemExist] = useState(config.findExist);
  const [nextLevelBtn, setNextLevelBtn] = useState(false);

  useEffect(() => {
    setFindDirection(config.findDirection);
  }, [config.findDirection]);

  useEffect(() => {
    setFindItemExist(config.findExist);
  }, [config.findExist]);
  //방향 찾기 게임으로 넘어감
  useEffect(() => {
    if (gameState.directionScore === config.findItems && level < 9)
      setNextLevelBtn(true);
  }, [gameState.directionScore]);

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
    }
  }, [gameState.existScore]);

  // 캐리어 물건 찾으면
  useEffect(() => {
    if (
      gameState.score === config.findItems &&
      gameState.start &&
      gameState.stage === RotateCarrierStage.FIND_ITEM
    ) {
      //존재 여부 찾기 게임으로 넘어감
      if (findItemExist)
        setGameState({ ...gameState, stage: RotateCarrierStage.FIND_EXIST });
      else if (findDirection)
        setGameState({
          ...gameState,
          stage: RotateCarrierStage.FIND_DIRECTION,
        });
      if (level < 9) setNextLevelBtn(true);
    }
  }, [gameState.score, level]);

  return {
    findDirection,
    findItemExist,
    nextLevelBtn,
    setNextLevelBtn,
    setFindDirection,
    setFindItemExist,
  };
}
