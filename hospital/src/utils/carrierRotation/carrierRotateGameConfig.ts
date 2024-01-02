const enum ANGLE {
  ANGLE_90 = 1,
  ANGLE_180 = 2,
  ANGLE_270 = 3,
}

const carrier: RotateCarrierSpacePoint = {
  x: 0,
  y: 0,
  w: 300,
  h: 500,
};

const space: RotateCarrierSpacePoint[] = [
  // 1 X 2
  { x: -130, y: -120, w: 200, h: 130 },
  { x: -130, y: 10, w: 200, h: 130 },
  // 2 x 2
  { x: -130, y: -120, w: 100, h: 130 },
  { x: -130, y: 10, w: 100, h: 130 },
  { x: -30, y: -120, w: 100, h: 130 },
  { x: -30, y: 10, w: 100, h: 130 },
];

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
    space: [space[0], space[1]],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [{ imageKey: "item1_0", point: space[0] }],
    obstacles: [],
    examples: [],
  },
  {
    level: 1,
    findItems: 1,
    obstacle: 1,
    findDirection: false,
    answerDirection: 1,
    space: [space[0], space[1]],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [{ imageKey: "item5_0", point: space[1] }],
    obstacles: [{ imageKey: "item1_0", point: space[0] }],
    examples: [],
  },
  {
    level: 2,
    findItems: 1,
    obstacle: 0,
    findDirection: true,
    answerDirection: 0,
    space: [space[2], space[3], space[4], space[5]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item1_0",
        point: { ...space[2], y: space[2].y + 10, h: 100 },
      },
    ],
    obstacles: [],
    examples: [
      {
        imageKey: "item1_0",
        point: { ...space[2], y: space[2].y + 10, h: 100 },
      },
      {
        imageKey: "item1_90",
        point: { ...space[3], y: space[3].y + 10, h: 100 },
      },
      {
        imageKey: "item1_180",
        point: { ...space[4], y: space[4].y + 10, h: 100 },
      },
      {
        imageKey: "item1_270",
        point: { ...space[5], y: space[5].y + 10, h: 100 },
      },
    ],
  },
];
