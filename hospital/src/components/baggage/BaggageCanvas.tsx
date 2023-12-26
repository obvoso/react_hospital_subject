import React, { useRef, useEffect, RefObject, useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
//import { startAnimation } from "./animationUtils";
import { drawStaticElements } from "./drawUtils";
import { BaggageStatus } from "@/utils/constEnum";

interface ItemAnimation {
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
    startAnimation();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        checkForMatchAndScore(event.key);
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
          startAnimation();
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${file}`);
        imagesToLoad--;
      };
      img.src = `/assets/baggage/${file}.png`;
    });
  };

  const startAnimation = () =>
    //canvas: HTMLCanvasElement
    //itemAnimations: RefObject<{ startTime: number; yPosition: number }[]>,
    //images: RefObject<{ [key: string]: HTMLImageElement }>
    {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      const startPositionY = 100;
      const endPositionY = cmToPixels(8.5);
      const duration = 1000; // 레일을 지나는데 걸리는 시간
      const delay = 1000; // 다음 아이템 등장 시간

      const animate = (timestamp: number) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawStaticElements(context, images);

        let animateDone = false;
        let updatedAnimations = itemAnimations.map((item, index) => {
          if (item.done) return item;

          const itemKey = `item_${index}`;
          const itemImage = images.current[itemKey];
          if (!itemImage) return item;

          const startTime =
            item.startTime === 0 ? timestamp + index * delay : item.startTime;
          const elapsed = timestamp - startTime;
          const progress = elapsed > 0 ? Math.min(1, elapsed / duration) : 0;
          const yPosition = progress * endPositionY;

          if (progress < 1)
            context.drawImage(itemImage, startPositionY, yPosition);

          if (progress >= 1 && index === itemAnimations.length - 1)
            animateDone = true;

          return {
            ...item,
            startTime: startTime,
            yPosition: yPosition,
            done: progress >= 1,
          };
        });

        setItemAnimations(updatedAnimations);

        if (!animateDone) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

  const checkForMatchAndScore = (pressedKey: string) => {
    const startPointY = 100;
    const endPositionY = cmToPixels(8.5);

    const currentItem = itemAnimations.find(
      (item) =>
        item.done == false &&
        item.yPosition >= startPointY &&
        item.yPosition <= endPositionY
    );
    console.log(currentItem);
    if (!currentItem) return;

    const carrierColor =
      pressedKey === "ArrowLeft" ? BaggageStatus.BLUE : BaggageStatus.YELLOW;

    if (currentItem.status === carrierColor) {
      setScore(score + 1);
      console.log("score: ", score + 1);
      setItemAnimations((prevItems) => {
        return prevItems.map((item) => {
          if (item === currentItem) {
            return { ...item, done: true };
          }
          return item;
        });
      });
    }
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
