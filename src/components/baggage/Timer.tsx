import { BaggageGameState } from "@/atoms/baggage/game";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export default function Timer() {
  const router = useRouter();
  const level = Number(router.query.level);
  const [timer, setTimer] = useState(0);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<number | null>(null);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      setTimer((Date.now() - startTimeRef.current) / 1000);
    }, 100) as unknown as number;
  };

  //타이머 시작
  useEffect(() => {
    if (gameState.start) startTimer();
    return () => {
      clearInterval(timerRef.current as number | undefined);
    };
  }, [gameState.start]);

  useEffect(() => {
    setTimer(0);
  }, [router.isReady, level]);

  return (
    <div className="flex w-full text-lg font-semibold items-center">
      <span className="bg-blue-300 text-white text-sm rounded-full py-1 px-3 ml-5 text-center">
        시간
      </span>
      <span className="ml-1 w-[80px] text-base text-gray-500">
        {timer.toFixed(2)}
      </span>
    </div>
  );
}
