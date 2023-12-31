import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Canvas from "@/components/rotateCarrier/Canvas";
import { RotateCarrierGameLevels } from "@/utils/carrierRotation/carrierRotateGameConfig";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
} from "@/atoms/rotateCarrier/config";
import { useRecoilState } from "recoil";

export default function GamePage() {
  const router = useRouter();
  const level = Number(router.query.level);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);

  useEffect(() => {
    const levelConfig = RotateCarrierGameLevels[level];
    setConfig(levelConfig);
  }, [level]);

  function handleStart() {
    setGameState({ ...gameState, start: true });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Canvas />
      <Button onClick={handleStart}>Start</Button>
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
