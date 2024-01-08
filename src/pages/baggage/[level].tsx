import { BaggageCanvas } from "@/components/baggage";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useResetRecoilState } from "recoil";
import { baggageGameLevels } from "@/utils/baggage/baggageGameConfig";
import {
  BaggageGameConfigState,
  BaggageGameState,
  CurrentItemIndex,
} from "@/atoms/baggage/game";
import CustomButton from "@/utils/CustomButton";

export default function GamePage() {
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const resetGameState = useResetRecoilState(BaggageGameState);
  const [config, setConfig] = useRecoilState(BaggageGameConfigState);
  const router = useRouter();
  const level = Number(router.query.level);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [nextBtn, setNextBtn] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] =
    useRecoilState(CurrentItemIndex);
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
    if (timeLeft === 0 && gameState.start) {
      if (level < 11) {
        setNextBtn(true);
      }
    }
  }, [timeLeft, gameState, level]);

  // 게임 클리어
  useEffect(() => {
    if (gameState.score === config.items && level < 11 && gameState.start) {
      setNextBtn(true);
    }
  }, [gameState, config, level]);

  const handleNextLevel = useCallback(() => {
    resetGameState(); // 상태 리셋
    setTimeLeft(config.timeLimit); // 시간 리셋
    setCurrentItemIndex(0);
    if (level < 11) router.push(`/baggage/${level + 1}`); // 다음 레벨로 이동
    setNextBtn(false);
  }, [nextBtn, level]);

  const handleStart = useCallback(() => {
    setGameState({ ...gameState, start: true });
  }, [level]);

  function handleGameClear() {
    resetGameState(); // 상태 리셋
    router.push("/");
  }

  // 레벨 설정
  useEffect(() => {
    const levelConfig = baggageGameLevels[level];
    setConfig(levelConfig);
    setTimeLeft(levelConfig.timeLimit);
    resetGameState();
  }, [level]);

  return (
    <div className="min-w-[500px] mx-auto px-4 py-5 bg-gray-100">
      <BaggageCanvas level={level} key={level} />
      <div className="text-center mt-4">
        <div className="text-lg font-semibold">점수: {gameState.score}</div>
        <div className="text-lg font-semibold">제한시간: {timeLeft}</div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <CustomButton
          text="게임 시작"
          onClick={handleStart}
          type={gameState.start ? "disabled" : "activate"}
        />
        {nextBtn && (
          <CustomButton
            text="다음 단계"
            onClick={handleNextLevel}
            type="activate"
          />
        )}
        {level === 11 &&
          (gameState.score === config.items || timeLeft === 0) && (
            <CustomButton
              text="처음으로"
              onClick={handleGameClear}
              type="activate"
            />
          )}
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
