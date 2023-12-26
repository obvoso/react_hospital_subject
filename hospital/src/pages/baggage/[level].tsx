// pages/game.tsx
import { BaggageCanvas } from "@/components/baggage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  baggageGameLevels,
  BaggageLevelConfig,
} from "@/utils/baggageGameLevels";
import { BaggageGameState } from "@/atoms/baggage/game";

export default function GamePage() {
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const router = useRouter();
  const level = Number(router.query.level);
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
      router.push(`/baggage/${level + 1}`); // 다음 레벨로 이동
    }
  }, [gameState.score, router, level]);

  return (
    <div>
      <BaggageCanvas gameLevelInfo={baggageGameLevels[level]} />
      <div>Score: {gameState.score}</div>
      <div>Time left: {timeLeft}</div>
      <button onClick={() => setGameState({ ...gameState, start: true })}>
        Start
      </button>
    </div>
  );
}

export const getStaticPaths = async () => {
  const paths = baggageGameLevels.map((level) => ({
    params: { level: level.level.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const levelConfig = baggageGameLevels.find(
    (level) => level.level.toString() === params.level
  );

  if (!levelConfig) {
    return { notFound: true };
  }

  return {
    props: {
      levelConfig,
    },
  };
};
