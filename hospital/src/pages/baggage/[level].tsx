import { BaggageCanvas } from "@/components/baggage";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { baggageGameLevels } from "@/utils/baggageGameLevels";
import { BaggageGameConfigState, BaggageGameState } from "@/atoms/baggage/game";
import { Button } from "@mui/material";

export default function GamePage() {
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const [config, setConfig] = useRecoilState(BaggageGameConfigState);
  const router = useRouter();
  const level = Number(router.query.level);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [nextBtn, setNextBtn] = useState(false);

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
    if (timeLeft === 0) if (level < 11) setNextBtn(true);
  }, [timeLeft]);

  // 게임 클리어
  useEffect(() => {
    //장애물 있을 경우 종료 조건 다름
    if (gameState.score === config.items && level < 11) setNextBtn(true);
  }, [gameState.score, router, level]);

  const handleNextLevel = useCallback(() => {
    setGameState({ start: false, score: 0 }); // 상태 리셋
    setTimeLeft(config.timeLimit); // 시간 리셋
    if (level < 11) router.push(`/baggage/${level + 1}`); // 다음 레벨로 이동
    setNextBtn(false);
  }, [nextBtn, router, level]);

  // 레벨 설정
  useEffect(() => {
    const levelConfig = baggageGameLevels[level];
    setConfig(levelConfig);
    setTimeLeft(levelConfig.timeLimit);
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <BaggageCanvas level={level} key={level} />
        <div className="text-center mt-4">
          <div className="text-lg font-semibold">점수: {gameState.score}</div>
          <div className="text-lg font-semibold">제한시간: {timeLeft}</div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="contained"
            className={`text-white font-bold py-2 px-4 rounded ${
              gameState.start
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => {
              if (!gameState.start) {
                setGameState({ ...gameState, start: true });
              }
            }}
            disabled={gameState.start}
          >
            게임 시작
          </Button>
          {nextBtn && (
            <Button
              variant="contained"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextLevel}
            >
              다음 단계
            </Button>
          )}
        </div>
      </div>
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
