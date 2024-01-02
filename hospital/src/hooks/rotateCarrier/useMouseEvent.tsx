import { RotateCarrierGameState } from "@/atoms/rotateCarrier/config";
import {
  RotateCarrierLevelConfig,
  RotateCarrierSpacePoint,
} from "@/utils/carrierRotation/carrierRotateGameConfig";
import { RefObject, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const useMouseEvent = (
  canvasRef: RefObject<HTMLCanvasElement>,
  config: RotateCarrierLevelConfig
) => {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [clickedRectIndex, setClickedRectIndex] = useState<number>(-1);

  const isMouseOverRect = (
    rect: RotateCarrierSpacePoint,
    mouseX: number,
    mouseY: number
  ) => {
    const ret =
      mouseX >= rect.x &&
      mouseX <= rect.x + rect.w &&
      mouseY >= rect.y &&
      mouseY <= rect.y + rect.h;
    return ret;
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x =
      (event.clientX - rect.left) * scaleX - canvasRef.current.width / 2;
    const y =
      (event.clientY - rect.top) * scaleY - canvasRef.current.height / 2;

    const rotatedX =
      x * Math.cos(-gameState.lastAngle) - y * Math.sin(-gameState.lastAngle);
    const rotatedY =
      x * Math.sin(-gameState.lastAngle) + y * Math.cos(-gameState.lastAngle);

    const rectIndex = config.space.findIndex((r) =>
      isMouseOverRect(r, rotatedX, rotatedY)
    );

    setClickedRectIndex(rectIndex);
    //정답
    config.answerDirection.forEach((answer) => {
      console.log(rectIndex, answer);
      if (rectIndex === answer) {
        setGameState((prev) => {
          return {
            ...prev,
            score: prev.score + 1,
          };
        });
      }
    });
  };

  const handleMouseUp = () => {
    setClickedRectIndex(-1);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.addEventListener("mousedown", handleMouseDown);
    canvasRef.current.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (!canvasRef.current) return;
      canvasRef.current.removeEventListener("mousedown", handleMouseDown);
      canvasRef.current.removeEventListener("mouseup", handleMouseUp);
    };
  }, [gameState.start, gameState.lastAngle]);
  return { clickedRectIndex };
};
