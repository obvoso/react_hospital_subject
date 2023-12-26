import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { BaggageStatus } from "@/utils/constEnum";
import { startAnimation, checkForMatchAndScore } from "./index";
import { useRecoilState } from "recoil";
import { BaggageGameState } from "@/atoms/baggage/game";

export interface ItemAnimation {
  startTime: number;
  yPosition: number;
  status: BaggageStatus;
  done: boolean;
  index: number;
}

function shuffleArrayKeepingIndex(array: ItemAnimation[]) {
  let newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function BaggageCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const [itemAnimations, setItemAnimations] = useState<ItemAnimation[]>([]);
  const [leftPressed, rightPressed] = useKeyPress(["ArrowLeft", "ArrowRight"]);
  const [lastScoredItemIndex, setLastScoredItemIndex] = useState(-1);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);

  useEffect(() => {
    preloadImages([
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

  const preloadImages = (imageFiles: string[]) => {
    let imagesToLoad = imageFiles.length;
    imageFiles.forEach((file) => {
      const img = new Image();
      img.onload = () => {
        images.current[file] = img;
        imagesToLoad--;
        if (
          imagesToLoad === 0 &&
          canvasRef.current &&
          itemAnimations.length === 0
        ) {
          const newItems = Array.from({ length: 5 }, (_, i) => ({
            startTime: 0,
            yPosition: 0,
            status: i % 2 === 0 ? BaggageStatus.BLUE : BaggageStatus.YELLOW,
            done: false,
            index: i,
          }));
          setItemAnimations(shuffleArrayKeepingIndex(newItems));
          //startAnimation(
          //  canvasRef.current,
          //  itemAnimations,
          //  setItemAnimations,
          //  images,
          //  gameState.start
          //);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${file}`);
        imagesToLoad--;
      };
      img.src = `/assets/baggage/${file}.png`;
    });
  };

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
