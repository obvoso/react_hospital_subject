import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Canvas from "@/components/rotateCarrier/Canvas";
import { RotateCarrierGameLevels } from "@/utils/carrierRotation/carrierRotateGameConfig";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
} from "@/atoms/rotateCarrier/config";
import { useRecoilState, useResetRecoilState } from "recoil";
import shuffleArray from "@/utils/arrayShuffle";
import CustomButton from "@/utils/CustomButton";

export default function GamePage() {
  const router = useRouter();
  const level = Number(router.query.level);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const resetGameState = useResetRecoilState(RotateCarrierGameState);
  const [nextBtn, setNextBtn] = useState(false);

  useEffect(() => {
    const levelConfig = RotateCarrierGameLevels[level];
    const shuffleAngle = shuffleArray(levelConfig.rotationAngle);
    setConfig({ ...levelConfig, rotationAngle: shuffleAngle });
    console.log(levelConfig);
  }, [level]);

  // 게임 클리어
  useEffect(() => {
    if (gameState.score === config.findItems && level < 9) setNextBtn(true);
  }, [gameState.score, router, level]);

  const handleNextLevel = useCallback(() => {
    resetGameState(); // 상태 리셋
    if (level < 9) router.push(`/rotate-carrier/${level + 1}`); // 다음 레벨로 이동
    setNextBtn(false);
  }, [nextBtn, level]);

  function handleStart() {
    setGameState({ ...gameState, start: true });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Canvas key={level} />
      <div className="flex justify-center space-x-4 mt-4">
        <CustomButton
          text="게임 시작"
          onClick={handleStart}
          type={gameState.start ? "done" : "ready"}
        />
        {nextBtn && (
          <CustomButton
            text="다음 단계"
            onClick={handleNextLevel}
            type="next"
          />
        )}
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const paths = RotateCarrierGameLevels.map((level) => ({
    params: { level: level.level.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { level: string };
}) => {
  const levelConfig = RotateCarrierGameLevels.find(
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
