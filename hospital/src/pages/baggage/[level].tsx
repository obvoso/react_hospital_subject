import { BaggageCanvas } from "@/components/baggage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { baggageGameLevels } from "@/utils/baggageGameLevels";
import { BaggageGameConfigState, BaggageGameState } from "@/atoms/baggage/game";

export default function GamePage() {
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const [config, setConfig] = useRecoilState(BaggageGameConfigState);
  const router = useRouter();
  const level = Number(router.query.level);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);

  // 타이머
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
      setTimeLeft(config.timeLimit); // 시간 리셋
      router.push(`/baggage/${Number(level) + 1}`); // 다음 레벨로 이동
    }
  }, [timeLeft]);

  // 게임 클리어
  useEffect(() => {
    //장애물 있을 경우 종료 조건 다름
    if (
      gameState.score === config.items
      //gameState.score === (config.obstacle ? config.items - 2 : config.items)
    ) {
      setGameState({ start: false, score: 0 }); // 상태 리셋
      setTimeLeft(config.timeLimit); // 시간 리셋
      if (level < 11) router.push(`/baggage/${level + 1}`); // 다음 레벨로 이동
    }
  }, [gameState.score, router, level]);

  // 레벨 설정
  useEffect(() => {
    const levelConfig = baggageGameLevels[level];
    setConfig(levelConfig);
    console.log(levelConfig);
    setTimeLeft(levelConfig.timeLimit);
  }, [level]);

  return (
    <div>
      <BaggageCanvas level={level} key={level} />
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

export const getStaticProps = async ({
  params,
}: {
  params: { level: string };
}) => {
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
