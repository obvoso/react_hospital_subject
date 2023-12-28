import React, { useRef, useEffect, useState } from "react";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { BaggageStatus } from "@/utils/constEnum";
import { startAnimation, checkForMatchAndScore, preloadImages } from "./index";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BaggageGameConfigState,
  BaggageGameState,
  DpiState,
} from "@/atoms/baggage/game";
import KeyDownButton from "./KeyDownButton";

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
  const [lastScoredItemIndex, setLastScoredItemIndex] = useState(-1);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const config = useRecoilValue(BaggageGameConfigState);
  const dpi = useRecoilValue(DpiState);
  const [leftPressed, rightPressed, downPressed] = useKeyPress([
    "ArrowLeft",
    "ArrowRight",
    "ArrowDown",
  ]);

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
      config,
      dpi
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
          dpi,
        });
      }
    };

    const incrementScoreForPassingItems = () => {
      if (
        itemAnimations.find(
          (item) =>
            item.status === BaggageStatus.PASS &&
            !item.done &&
            item.yPosition >= cmToPixels(dpi, 8.5) - 80
        )
      ) {
        setItemAnimations((prev) =>
          prev.map((item) => {
            if (
              item.status === BaggageStatus.PASS &&
              !item.done &&
              item.yPosition >= cmToPixels(dpi, 8.5) - 80
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
    <div className="flex flex-col items-center min-w-[500px]">
      <div className="flex flex-col bg-blue-100 p-4 rounded-xl">
        <span className="text-lg font-bold text-center">
          {level > 1 ? level - 1 + "단계" : "연습"}
        </span>
        <span className="font-semibold text-center whitespace-pre-line">
          {config.subject}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={cmToPixels(dpi, 10)}
        height={cmToPixels(dpi, 14)}
      ></canvas>
      <div className="flex mt-4">
        <KeyDownButton downPressed={leftPressed}>
          <ArrowCircleLeftTwoToneIcon />
        </KeyDownButton>
        {level >= 6 && level !== 8 && level !== 9 && (
          <KeyDownButton downPressed={downPressed}>
            <ArrowCircleDownTwoToneIcon />
          </KeyDownButton>
        )}
        <KeyDownButton downPressed={rightPressed}>
          <ArrowCircleRightTwoToneIcon />
        </KeyDownButton>
      </div>
    </div>
  );
}
