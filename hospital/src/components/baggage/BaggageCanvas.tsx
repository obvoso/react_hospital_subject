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
import { useGameControls } from "@/hooks/baggage/useGameControl";

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
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const config = useRecoilValue(BaggageGameConfigState);
  const dpi = useRecoilValue(DpiState);
  const handleScore = useGameControls(
    canvasRef,
    images,
    itemAnimations,
    setItemAnimations,
    gameState,
    setGameState,
    level,
    config
  );
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
        width={cmToPixels(10)}
        height={cmToPixels(14)}
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
