// pages/game.tsx
import { BaggageCanvas } from "@/components/baggage";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { BaggageGameState } from "@/atoms/baggage/game";

export default function GamePage() {
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const router = useRouter();
  const { level } = router.query;
  const [timeLeft, setTimeLeft] = useState(11);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.start) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState.start]);

  // 게임 오버
  useEffect(() => {
    if (timeLeft === 0) {
      setGameState({ start: false, score: 0 }); // 상태 리셋
      setTimeLeft(11); // 시간 리셋
      router.push(`/baggage/${Number(level) + 1}`); // 다음 레벨로 이동
    }
  }, [timeLeft]);

  // 게임 클리어
  useEffect(() => {
    if (gameState.score === 5) {
      setGameState({ start: false, score: 0 }); // 상태 리셋
      setTimeLeft(11); // 시간 리셋
      router.push(`/baggage/${Number(level) + 1}`); // 다음 레벨로 이동
    }
  }, [gameState.score, router, level]);

  return (
    <div>
      <BaggageCanvas />
      <div>Score: {gameState.score}</div>
      <div>Time left: {timeLeft}</div>
      <button onClick={() => setGameState({ ...gameState, start: true })}>
        Start
      </button>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { level: "0" } },
      { params: { level: "1" } },
      { params: { level: "2" } },
      { params: { level: "3" } },
      { params: { level: "4" } },
      { params: { level: "5" } },
      { params: { level: "6" } },
      { params: { level: "7" } },
      { params: { level: "8" } },
      { params: { level: "9" } },
      { params: { level: "10" } },
      { params: { level: "11" } },
      { params: { level: "12" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { level: string };
}) {
  // Fetch data for the blog post using params.level
  return {
    props: {
      // Your props here
    },
  };
}
