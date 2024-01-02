import { RotateCarrierLevelConfig } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { atom } from "recoil";

interface IRotateCarrierGame {
  score: number;
  directionScore: number;
  start: boolean;
  lastAngle: number;
  lastDirection: number;
}

export const SubjectTextState = atom({
  key: "SubjectTextState",
  default: "",
});

export const RotateCarrierGameState = atom<IRotateCarrierGame>({
  key: "RotateCarrierGameState",
  default: {
    score: 0,
    directionScore: 0,
    start: false,
    lastAngle: 0,
    lastDirection: 0,
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
    carrier: { imageKey: "carrier", point: { x: 0, y: 0, w: 0, h: 0 } },
    questions: [],
    obstacles: [],
    examples: [],
  },
});
