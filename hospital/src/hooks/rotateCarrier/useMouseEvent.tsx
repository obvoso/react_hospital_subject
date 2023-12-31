import { IGame } from "@/atoms/baggage/game";
import { RotateCarrierGameState } from "@/atoms/rotateCarrier/config";
import {
  RotateCarrierLevelConfig,
  RotateCarrierSpacePoint,
} from "@/utils/carrierRotation/carrierRotateGameConfig";
import { RefObject, useEffect } from "react";
import { useRecoilState } from "recoil";

export const useMouseEvent = (
  canvasRef: RefObject<HTMLCanvasElement>,
  config: RotateCarrierLevelConfig,
  setClickedRectIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);

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

    const rotatedX = x * Math.cos(-Math.PI / 2) - y * Math.sin(-Math.PI / 2);
    const rotatedY = x * Math.sin(-Math.PI / 2) + y * Math.cos(-Math.PI / 2);

    const rectIndex = config.space.findIndex((r) =>
      isMouseOverRect(r, rotatedX, rotatedY)
    );
    setClickedRectIndex(rectIndex >= 0 ? rectIndex : -1);
    if (rectIndex === config.answerDirection) {
      setGameState((prev) => {
        return {
          ...prev,
          score: prev.score + 1,
        };
      });
    }
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
  }, [gameState.start]);
};
