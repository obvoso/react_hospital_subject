import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useResetRecoilState } from "recoil";
import { baggageGameLevels } from "@/utils/baggage/baggageGameConfig";
import { BaggageCanvas } from "@/components/baggage";
import {
  BaggageGameConfigState,
  BaggageGameState,
  CurrentItemIndex,
} from "@/atoms/baggage/game";
import LevelNav from "@/utils/LevelNav";
import GameButtons from "@/components/baggage/GameButtons";

export default function GamePage() {
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const resetCurrentItemState = useResetRecoilState(CurrentItemIndex);
  const resetGameState = useResetRecoilState(BaggageGameState);
  const [config, setConfig] = useRecoilState(BaggageGameConfigState);
  const router = useRouter();
  const level = Number(router.query.level);
  const [timer, setTimer] = useState(0);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<number | null>(null);
  const [nextBtn, setNextBtn] = useState(false);
  const resetCurrentItemIndex = useResetRecoilState(CurrentItemIndex);
  const resetConfig = useResetRecoilState(BaggageGameConfigState);

  const reset = () => {
    resetGameState(); // 상태 리셋
    resetCurrentItemIndex(); // 현재 아이템 인덱스 리셋
    setTimer(0); // 시간 리셋
    setNextBtn(false);
    resetCurrentItemState();
  };

  // 레벨 설정
  useEffect(() => {
    if (!router.isReady) return;
    const levelConfig = baggageGameLevels[level];
    setConfig(levelConfig);

    return () => {
      reset();
      resetConfig();
    };
  }, [router.isReady, level]);

  //타이머 시작
  useEffect(() => {
    if (gameState.start) startTimer();
    return () => clearInterval(timerRef.current as number | undefined);
  }, [gameState.start]);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      setTimer((Date.now() - startTimeRef.current) / 1000);
    }, 100) as unknown as number;
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between min-w-[500px] mx-auto px-4 py-5">
      <div className="flex flex-col items-center sm:items-start">
        <BaggageCanvas level={level} key={level} />
        <div className="flex flex-col items-center text-center mx-auto mt-4">
          <div className="text-lg font-semibold">점수: {gameState.score}</div>
          <div className="text-lg font-semibold">시간: {timer.toFixed(2)}</div>
          <GameButtons
            reset={reset}
            level={level}
            nextBtn={nextBtn}
            setNextBtn={setNextBtn}
          />
        </div>
      </div>
      <div className="flex items-center justify-center h-fit md:ml-32 sm:ml-20 sm:mt-20 mb-10">
        <LevelNav game="baggage" />
      </div>
    </div>
  );
}
