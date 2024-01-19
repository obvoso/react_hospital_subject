import { RotateCarrierLevelConfig } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { atom } from "recoil";

export enum RotateCarrierStage {
  FIND_ITEM,
  FIND_DIRECTION,
  FIND_EXIST,
  FINISH,
}

interface IRotateCarrierGame {
  stage: RotateCarrierStage;
  score: number;
  directionScore: number;
  existScore: number;
  start: boolean;
  lastAngle: number;
  lastDirection: number;
}

export const SubjectTextState = atom({
  key: "SubjectTextState",
  default:
    "캐리어가 회전합니다.\n물건의 위치를 기억하고, 물건의 알맞은 방향도 선택해주세요.",
});

export const RotateCarrierGameState = atom<IRotateCarrierGame>({
  key: "RotateCarrierGameState",
  default: {
    stage: RotateCarrierStage.FIND_ITEM,
    score: 0,
    directionScore: 0,
    existScore: 0,
    start: false,
    lastAngle: 0,
    lastDirection: 0,
  },
});

export const RotateCarrierConfigState = atom<RotateCarrierLevelConfig>({
  key: "RotateCarrierConfigState",
  default: {
    level: 0,
    findItems: -1,
    obstacle: 0,
    findDirection: false,
    findExist: false,
    answerDirection: [],
    space: [
      { x: 0, y: 0, w: 0, h: 0 },
      { x: 0, y: 0, w: 0, h: 0 },
    ],
    rotation: 0,
    rotationAngle: [],
    carrier: { imageKey: "carrier", point: { x: 0, y: 0, w: 0, h: 0 } },
    questions: [],
    obstacles: [],
    itemExamples: [],
    dirrectionExamples: [],
  },
});
