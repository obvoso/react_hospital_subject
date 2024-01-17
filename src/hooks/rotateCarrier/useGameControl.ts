import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
} from "@/atoms/rotateCarrier/config";
import config from "next/config";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export function useGameControl(level: number) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [findDirection, setFindDirection] = useState(false);
  const [findItemExist, setFindItemExist] = useState(false);
  const [nextLevelBtn, setNextLevelBtn] = useState(false);

  //방향 찾기 게임으로 넘어감
  useEffect(() => {
    if (gameState.directionScore === config.findItems && level < 9)
      setNextLevelBtn(true);
  }, [gameState.directionScore]);

  useEffect(() => {
    if (gameState.itemScore === config.findItems) {
      setFindDirection(true);
    }
  }, [gameState.itemScore]);

  // 캐리어 물건 찾으면
  useEffect(() => {
    if (gameState.score === config.findItems && gameState.start) {
      //존재 여부 찾기 게임으로 넘어감
      if (config.itemExamples.length && !gameState.itemScore) {
        setFindItemExist(true);
        return;
      }
      //방향 찾기 게임으로 넘어감
      if (config.findDirection && !gameState.directionScore) {
        setFindDirection(true);
        return;
      }
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
