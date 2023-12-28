import React, { useRef, useEffect, useState } from "react";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { BaggageStatus } from "@/utils/constEnum";
import { preloadImages } from "./index";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  BaggageGameConfigState,
  BaggageGameState,
  DpiState,
} from "@/atoms/baggage/game";
import KeyDownButton from "./KeyDownButton";
import { useAnimation, useGameControls } from "@/hooks/baggage/useGameControl";

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
  const handleScore = useGameControls(
    itemAnimations,
    setItemAnimations,
    gameState,
    setGameState,
    dpi,
    level,
    config,
    lastScoredItemIndex,
    setLastScoredItemIndex
  );
  const [leftPressed, rightPressed, downPressed] = useKeyPress([
    "ArrowLeft",
    "ArrowRight",
    "ArrowDown",
  ]);

  useAnimation(
    canvasRef,
    itemAnimations,
    setItemAnimations,
    images,
    gameState,
    config,
    dpi
  );

  useEffect(() => {
    preloadImages(canvasRef, images, itemAnimations, setItemAnimations, config);
    return () => {
      images.current = {};
      setItemAnimations([]);
      setLastScoredItemIndex(-1);
    };
  }, [config]);

  return (
    <div className="flex flex-col items-center min-w-[500px]">
      <div className="flex flex-col bg-blue-200 p-4 rounded-xl">
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
        <KeyDownButton
          downPressed={leftPressed}
          checkForMatchAndScore={() => handleScore("ArrowLeft")}
        >
          <ArrowCircleLeftTwoToneIcon />
        </KeyDownButton>
        {level >= 6 && level !== 8 && level !== 9 && (
          <KeyDownButton
            downPressed={downPressed}
            checkForMatchAndScore={() => handleScore("ArrowDown")}
          >
            <ArrowCircleDownTwoToneIcon />
          </KeyDownButton>
        )}
        <KeyDownButton
          downPressed={rightPressed}
          checkForMatchAndScore={() => handleScore("ArrowRight")}
        >
          <ArrowCircleRightTwoToneIcon />
        </KeyDownButton>
      </div>
    </div>
  );
}
