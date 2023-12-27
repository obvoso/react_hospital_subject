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
  index: number;
}

export default function BaggageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const [itemAnimations, setItemAnimations] = useState<ItemAnimation[]>([]);
  const [leftPressed, rightPressed] = useKeyPress(["ArrowLeft", "ArrowRight"]);
  const [lastScoredItemIndex, setLastScoredItemIndex] = useState(-1);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const [config, setConfig] = useRecoilState(BaggageGameConfigState);

  useEffect(() => {
    // 레벨링 따라서 이미지 로드해야됨
    preloadImages(canvasRef, images, itemAnimations, setItemAnimations, [
      "conveyor",
      "carrier_blue",
      "carrier_yellow",
      "item_0",
      "item_1",
      "item_2",
      "item_3",
      "item_4",
    ]);
  }, []);

  useEffect(() => {
    startAnimation(
      canvasRef.current,
      itemAnimations,
      setItemAnimations,
      images,
      gameState.start
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
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

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [itemAnimations, gameState.start]);

  //useEffect(() => {
  //  setItemAnimations([]);
  //  setLastScoredItemIndex(-1);
  //}, [config, gameState.start]);

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
