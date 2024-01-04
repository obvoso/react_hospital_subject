import React, { useRef, useEffect, useState } from "react";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { cmToPixels } from "@/utils/unit";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { drawStaticElements, preloadImages } from "./index";
import { useRecoilState, useRecoilValue } from "recoil";
import { BaggageGameConfigState } from "@/atoms/baggage/game";
import KeyDownButton from "./KeyDownButton";
import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import { useAnimation } from "@/hooks/baggage/useAnimation";

export default function BaggageCanvas({ level }: { level: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);
  const config = useRecoilValue(BaggageGameConfigState);

  useAnimation({ canvasRef, images });
  const { keysPressed, checkForMatchAndScore } = useKeyPress();
  const [leftPressed, rightPressed, downPressed] = keysPressed;

  useEffect(() => {
    preloadImages(
      canvasRef,
      images,
      itemAnimations,
      setItemAnimations,
      config,
      drawStaticElements
    );
    return () => {
      images.current = {};
      setItemAnimations([]);
    };
  }, [config, level]);

  return (
    <div className="flex flex-col items-center min-w-[500px]">
      <div className="flex flex-col bg-white p-4 rounded-xl shadow-md">
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
          checkForMatchAndScore={() =>
            checkForMatchAndScore(
              "ArrowLeft",
              itemAnimations,
              setItemAnimations
            )
          }
        >
          <ArrowCircleLeftTwoToneIcon />
        </KeyDownButton>
        {level >= 6 && level !== 8 && level !== 9 && (
          <KeyDownButton
            downPressed={downPressed}
            checkForMatchAndScore={() =>
              checkForMatchAndScore(
                "ArrowDown",
                itemAnimations,
                setItemAnimations
              )
            }
          >
            <ArrowCircleDownTwoToneIcon />
          </KeyDownButton>
        )}
        <KeyDownButton
          downPressed={rightPressed}
          checkForMatchAndScore={() =>
            checkForMatchAndScore(
              "ArrowRight",
              itemAnimations,
              setItemAnimations
            )
          }
        >
          <ArrowCircleRightTwoToneIcon />
        </KeyDownButton>
      </div>
    </div>
  );
}
