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
    <div>
      <div className="text-lg font-semibold">시간: {timer.toFixed(2)}</div>
    </div>
  );
}
