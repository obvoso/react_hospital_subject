import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { BaggageStatus } from "@/utils/constEnum";
import { startAnimation, checkForMatchAndScore, preloadImages } from "./index";
import { useRecoilState } from "recoil";
import { BaggageGameConfigState, BaggageGameState } from "@/atoms/baggage/game";

export interface ItemAnimation {
  startTime: number;
  yPosition: number;
  status: BaggageStatus;
  done: boolean;
  imageKey: string;
}

export default function BaggageCanvas({ level }: { level: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const [itemAnimations, setItemAnimations] = useState<ItemAnimation[]>([]);
  const [leftPressed, rightPressed] = useKeyPress(["ArrowLeft", "ArrowRight"]);
  const [lastScoredItemIndex, setLastScoredItemIndex] = useState(-1);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const [config, setConfig] = useRecoilState(BaggageGameConfigState);

  useEffect(() => {
    preloadImages(canvasRef, images, itemAnimations, setItemAnimations, config);
    return () => {
      images.current = {};
      setItemAnimations([]);
      setLastScoredItemIndex(-1);
    };
  }, [config]);

  useEffect(() => {
    startAnimation(
      canvasRef.current,
      itemAnimations,
      setItemAnimations,
      images,
      gameState.start,
      config
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        checkForMatchAndScore({
          pressedKey: event.key,
          itemAnimations: itemAnimations,
          score: gameState.score,
          setScore: () =>
            setGameState({ ...gameState, score: gameState.score + 1 }),
          setItemAnimations: setItemAnimations,
          lastScoredItemIndex: lastScoredItemIndex,
          setLastScoredItemIndex: setLastScoredItemIndex,
        });
      }
    };

    const incrementScoreForPassingItems = () => {
      if (
        itemAnimations.find(
          (item) =>
            item.status === BaggageStatus.PASS &&
            !item.done &&
            item.yPosition >= cmToPixels(8.5) + 20
        )
      ) {
        setItemAnimations((prev) =>
          prev.map((item) => {
            if (
              item.status === BaggageStatus.PASS &&
              !item.done &&
              item.yPosition >= cmToPixels(8.5) + 20
            ) {
              item.done = true;
              setGameState({ ...gameState, score: gameState.score + 1 });
            }
            return item;
          })
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      incrementScoreForPassingItems();
    };
  }, [itemAnimations, gameState.start, level, config]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={cmToPixels(10)}
        height={cmToPixels(15)}
      ></canvas>
      <Button
        variant={leftPressed ? "contained" : "outlined"}
        startIcon={<ArrowBackIosIcon />}
      >
        Left
      </Button>
      <Button
        variant={rightPressed ? "contained" : "outlined"}
        endIcon={<ArrowForwardIosIcon />}
      >
        Right
      </Button>
    </>
  );
}
