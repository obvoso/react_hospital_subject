import React, { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { startAnimation } from "./animationUtils";

interface BaggageCanvasProps {
  score: number;
  setScore: (score: number) => void;
}

export default function BaggageCanvas({ score, setScore }: BaggageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const itemAnimations = useRef<
    Array<{ startTime: number; yPosition: number }>
  >([]);
  const [leftPressed, rightPressed] = useKeyPress(["ArrowLeft", "ArrowRight"]);

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

  const preloadImages = (imageFiles: string[]) => {
    let imagesToLoad = imageFiles.length;
    imageFiles.forEach((file) => {
      const img = new Image();
      img.onload = () => {
        images.current[file] = img;
        imagesToLoad--;
        if (imagesToLoad === 0 && canvasRef.current) {
          startAnimation(canvasRef.current, itemAnimations, images);
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
