const enum ANGLE {
  ANGLE_90 = 1,
  ANGLE_180 = 2,
  ANGLE_270 = 3,
}

export interface RotateCarrierItemAssets {
  imageKey: string;
  point: RotateCarrierSpacePoint;
}

export interface RotateCarrierSpacePoint {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RotateCarrierLevelConfig {
  level: number;
  findItems: number;
  obstacle: number;
  findDirection: boolean;
  answerDirection: number;
  space: RotateCarrierSpacePoint[];
  rotation: number;
  rotationAngle: number[];
  carrier: RotateCarrierItemAssets;
  questions: RotateCarrierItemAssets[];
  obstacles: RotateCarrierItemAssets[];
  examples: RotateCarrierItemAssets[];
}

export const RotateCarrierGameLevels: RotateCarrierLevelConfig[] = [
  {
    level: 0,
    findItems: 1,
    obstacle: 0,
    findDirection: false,
    answerDirection: 0,
    space: [
      { x: -120, y: -150, w: 190, h: 95 },
      { x: -120, y: -55, w: 190, h: 95 },
    ],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: { x: 0, y: 0, w: 300, h: 400 } },
    questions: [
      { imageKey: "item1_0", point: { x: -120, y: -150, w: 190, h: 95 } },
    ],
    obstacles: [],
    examples: [],
  },
  {
    level: 1,
    findItems: 1,
    obstacle: 1,
    findDirection: false,
    answerDirection: 1,
    space: [
      { x: -120, y: -150, w: 190, h: 95 },
      { x: -120, y: -55, w: 190, h: 95 },
    ],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: { x: 0, y: 0, w: 300, h: 400 } },
    questions: [
      { imageKey: "item5_0", point: { x: -120, y: -55, w: 190, h: 95 } },
    ],
    obstacles: [
      {
        imageKey: "item1_0",
        point: { x: -120, y: -150, w: 190, h: 95 },
      },
    ],
    examples: [],
  },
];
