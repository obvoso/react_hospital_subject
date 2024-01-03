const enum ANGLE {
  ANGLE_90 = 1,
  ANGLE_180 = 2,
  ANGLE_270 = 3,
}

const carrier: RotateCarrierSpacePoint = {
  x: 210,
  y: 100,
  w: 300,
  h: 500,
};

interface DirectionGroup {
  items: string[];
}

const space: RotateCarrierSpacePoint[] = [
  // 1 X 2
  { x: -105, y: -120, w: 200, h: 130 },
  { x: -105, y: 10, w: 200, h: 130 },
  // 2 x 2
  { x: -105, y: -120, w: 100, h: 130 },
  { x: -105, y: 10, w: 100, h: 130 },
  { x: -5, y: -120, w: 100, h: 130 },
  { x: -5, y: 10, w: 100, h: 130 },
  // 2 x 3
  { x: -105, y: -120, w: 100, h: 85 },
  { x: -105, y: -35, w: 100, h: 85 },
  { x: -105, y: 50, w: 100, h: 85 },
  { x: -5, y: -120, w: 100, h: 85 },
  { x: -5, y: -35, w: 100, h: 85 },
  { x: -5, y: 50, w: 100, h: 85 },
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
  answerDirection: number[];
  space: RotateCarrierSpacePoint[];
  rotation: number;
  rotationAngle: number[];
  carrier: RotateCarrierItemAssets;
  questions: RotateCarrierItemAssets[];
  obstacles: RotateCarrierItemAssets[];
  itemExamples: string[];
  dirrectionExamples: DirectionGroup[];
}

export const RotateCarrierGameLevels: RotateCarrierLevelConfig[] = [
  {
    level: 0,
    findItems: 1,
    obstacle: 0,
    findDirection: false,
    answerDirection: [0],
    space: [space[0], space[1]],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [{ imageKey: "item1_0", point: space[0] }],
    obstacles: [],
    itemExamples: [],
    dirrectionExamples: [],
  },
  {
    level: 1,
    findItems: 1,
    obstacle: 1,
    findDirection: false,
    answerDirection: [1],
    space: [space[0], space[1]],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [{ imageKey: "item5_0", point: space[1] }],
    obstacles: [{ imageKey: "item1_0", point: space[0] }],
    itemExamples: [],
    dirrectionExamples: [],
  },
  {
    level: 2,
    findItems: 1,
    obstacle: 0,
    findDirection: true,
    answerDirection: [0],
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
    itemExamples: [],
    dirrectionExamples: [
      { items: ["item1_0", "item1_90", "item1_180", "item1_270"] },
    ],
  },
  {
    level: 3,
    findItems: 1,
    obstacle: 0,
    findDirection: true,
    answerDirection: [0],
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
    obstacles: [
      {
        imageKey: "obstacle0",
        point: { ...space[4], y: space[4].y + 20, h: 90 },
      },
    ],
    itemExamples: [],
    dirrectionExamples: [
      { items: ["item1_0", "item1_90", "item1_180", "item1_270"] },
    ],
  },
  {
    level: 4,
    findItems: 1,
    obstacle: 0,
    findDirection: true,
    answerDirection: [0],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { ...space[2], y: space[2].y + 30, h: 80 },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_90",
        point: { ...space[3], y: space[3].y + 20, h: 90 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[5], y: space[5].y + 20, h: 90 },
      },
    ],
    itemExamples: [],
    dirrectionExamples: [
      { items: ["item2_0", "item2_90", "item2_180", "item2_270"] },
    ],
  },
  {
    level: 5,
    findItems: 2,
    obstacle: 0,
    findDirection: true,
    answerDirection: [0, 3],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_180],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { ...space[2], y: space[2].y + 30, h: 80 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[5], y: space[5].y + 20, h: 90 },
      },
    ],
    obstacles: [],
    itemExamples: ["item0_0", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      { items: ["item2_0", "item2_90", "item2_180", "item2_270"] },
      { items: ["item4_0", "item4_90", "item4_180", "item4_270"] },
    ],
  },
  {
    level: 6,
    findItems: 2,
    obstacle: 1,
    findDirection: true,
    answerDirection: [0, 3],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 4,
    rotationAngle: [
      ANGLE.ANGLE_90,
      ANGLE.ANGLE_90,
      ANGLE.ANGLE_180,
      ANGLE.ANGLE_180,
    ],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { ...space[2], y: space[2].y + 30, h: 80 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[5], y: space[5].y + 20, h: 90 },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_90",
        point: {
          x: space[1].x + 10,
          y: space[1].y + 30,
          w: 80,
          h: 80,
        },
      },
    ],
    itemExamples: ["item0_90", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      { items: ["item2_0", "item2_90", "item2_180", "item2_270"] },
      { items: ["item4_0", "item4_90", "item4_180", "item4_270"] },
    ],
  },
  {
    level: 7,
    findItems: 2,
    obstacle: 2,
    findDirection: true,
    answerDirection: [0, 3],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 4,
    rotationAngle: [
      ANGLE.ANGLE_90,
      ANGLE.ANGLE_90,
      ANGLE.ANGLE_180,
      ANGLE.ANGLE_180,
    ],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { ...space[2], y: space[2].y + 30, h: 80 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[5], y: space[5].y + 20, h: 90 },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_90",
        point: {
          x: space[3].x + 10,
          y: space[3].y + 30,
          w: 80,
          h: 80,
        },
      },
      {
        imageKey: "obstacle1",
        point: {
          x: space[4].x + 10,
          y: space[4].y + 30,
          w: 80,
          h: 80,
        },
      },
    ],
    itemExamples: ["item0_90", "obstacle1", "item2_0", "item4_0"],
    dirrectionExamples: [
      { items: ["item2_0", "item2_90", "item2_180", "item2_270"] },
      { items: ["item4_0", "item4_90", "item4_180", "item4_270"] },
    ],
  },
  {
    level: 8,
    findItems: 2,
    obstacle: 2,
    findDirection: true,
    answerDirection: [1, 5],
    space: [space[6], space[7], space[8], space[9], space[10], space[11]],
    rotation: 5,
    rotationAngle: [
      ANGLE.ANGLE_90,
      ANGLE.ANGLE_90,
      ANGLE.ANGLE_180,
      ANGLE.ANGLE_180,
      ANGLE.ANGLE_270,
    ],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { x: space[11].x + 10, y: space[11].y + 20, w: 80, h: 50 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[7], h: 90 },
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle1",
        point: {
          x: space[6].x + 20,
          y: space[6].y + 10,
          w: 60,
          h: 60,
        },
      },
    ],
    itemExamples: ["item0_90", "obstacle1", "item2_0", "item4_0"],
    dirrectionExamples: [
      { items: ["item2_0", "item2_90", "item2_180", "item2_270"] },
      { items: ["item4_0", "item4_90", "item4_180", "item4_270"] },
    ],
  },
  {
    level: 9,
    findItems: 2,
    obstacle: 2,
    findDirection: true,
    answerDirection: [1, 5],
    space: [space[6], space[7], space[8], space[9], space[10], space[11]],
    rotation: 5,
    rotationAngle: [
      ANGLE.ANGLE_90,
      ANGLE.ANGLE_180,
      ANGLE.ANGLE_180,
      ANGLE.ANGLE_270,
      ANGLE.ANGLE_270,
    ],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { x: space[11].x + 10, y: space[11].y + 20, w: 80, h: 50 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[7], h: 90 },
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle1",
        point: {
          x: space[6].x + 20,
          y: space[6].y + 10,
          w: 60,
          h: 60,
        },
      },
      {
        imageKey: "item0_90",
        point: {
          x: space[9].x + 20,
          y: space[9].y + 10,
          w: 60,
          h: 60,
        },
      },
    ],
    itemExamples: ["item0_90", "obstacle1", "item2_0", "item4_0"],
    dirrectionExamples: [
      { items: ["item2_0", "item2_90", "item2_180", "item2_270"] },
      { items: ["item4_0", "item4_90", "item4_180", "item4_270"] },
    ],
  },
];
