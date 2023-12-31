import { IGame } from "@/atoms/baggage/game";
import {
  RotateCarrierLevelConfig,
  RotateCarrierSpacePoint,
} from "@/utils/carrierRotation/carrierRotateGameConfig";
import { RefObject } from "react";

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

export const handlemouseDown = (
  event: MouseEvent,
  canvas: RefObject<HTMLCanvasElement>,
  config: RotateCarrierLevelConfig,
  setClickedRectIndex: React.Dispatch<React.SetStateAction<number>>,
  increaseScore: (incrementFunction: (prevState: IGame) => IGame) => void
) => {
  if (!canvas.current) return;
  const rect = canvas.current.getBoundingClientRect();
  const scaleX = canvas.current.width / rect.width;
  const scaleY = canvas.current.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX - canvas.current.width / 2;
  const y = (event.clientY - rect.top) * scaleY - canvas.current.height / 2;

  const rotatedX = x * Math.cos(-Math.PI / 2) - y * Math.sin(-Math.PI / 2);
  const rotatedY = x * Math.sin(-Math.PI / 2) + y * Math.cos(-Math.PI / 2);

  const rectIndex = config.space.findIndex((r) =>
    isMouseOverRect(r, rotatedX, rotatedY)
  );
  setClickedRectIndex(rectIndex >= 0 ? rectIndex : -1);
  if (rectIndex === config.answerDirection) {
    increaseScore((prev) => {
      return {
        ...prev,
        score: prev.score + 1,
      };
    });
  }
};

export const handlemouseUp = (
  setClickedRectIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  setClickedRectIndex(-1);
};
