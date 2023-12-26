import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { startAnimation } from "./animationUtils";
import { BaggageStatus } from "@/utils/constEnum";
import { checkForMatchAndScore } from "./keyPress";

export interface ItemAnimation {
  startTime: number;
  yPosition: number;
  status: BaggageStatus;
  done: boolean;
}

interface BaggageCanvasProps {
  score: number;
  setScore: (score: number) => void;
}

export default function BaggageCanvas({ score, setScore }: BaggageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const [itemAnimations, setItemAnimations] = useState<ItemAnimation[]>([]);
  const [leftPressed, rightPressed] = useKeyPress(["ArrowLeft", "ArrowRight"]);
  const [lastScoredItemIndex, setLastScoredItemIndex] = useState(-1);

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
    if (itemAnimations.length === 0) return;
    startAnimation(
      canvasRef.current,
      itemAnimations,
      setItemAnimations,
      images
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        checkForMatchAndScore({
          pressedKey: event.key,
          itemAnimations: itemAnimations,
          score: score,
          setScore: setScore,
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
  }, [itemAnimations]);

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
          }));

          setItemAnimations(newItems);
          startAnimation(
            canvasRef.current,
            itemAnimations,
            setItemAnimations,
            images
          );
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
