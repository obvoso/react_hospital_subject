import { RotateCarrierLevelConfig } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { atom } from "recoil";

interface IRotateCarrierGame {
  score: number;
  start: boolean;
  rotateCount: number;
  rotateDirection: string;
}

export const RotateCarrierGameState = atom<IRotateCarrierGame>({
  key: "RotateCarrierGameState",
  default: {
    score: 0,
    start: false,
    rotateCount: 0,
    rotateDirection: "left",
  },
});

export const RotateCarrierConfigState = atom<RotateCarrierLevelConfig>({
  key: "RotateCarrierConfigState",
  default: {
    level: 0,
    findItems: 1,
    obstacle: 0,
    findDirection: false,
    answerDirection: 0,
    space: [
      { x: 0, y: 0, w: 0, h: 0 },
      { x: 0, y: 0, w: 0, h: 0 },
    ],
    rotation: 1,
    rotationAngle: [2],
    item: [{ imageKey: "item1_0", point: { x: 0, y: 0, w: 0, h: 0 } }],
    example: [{ imageKey: "item1_0", point: { x: 0, y: 0, w: 0, h: 0 } }],
  },
});
