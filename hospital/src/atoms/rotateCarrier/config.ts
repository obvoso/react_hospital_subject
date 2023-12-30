import { RotateCarrierLevelConfig } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { atom } from "recoil";

export const RotateCarrierGameState = atom({
  key: "RotateCarrierGameState",
  default: {
    score: 0,
    start: false,
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
    rotationCount: 0,
    rotationAngle: [2],
    item: [{ imageKey: "item1_0", point: { x: 0, y: 0, w: 0, h: 0 } }],
    example: [{ imageKey: "item1_0", point: { x: 0, y: 0, w: 0, h: 0 } }],
  },
});
