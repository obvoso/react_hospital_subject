export const enum ANGLE {
  ANGLE_90 = 1,
  ANGLE_180 = 2,
  ANGLE_270 = 3,
}

export const carrier: RotateCarrierSpacePoint = {
  x: 0,
  y: 0,
  w: 250,
  h: 400,
};

export interface DirectionGroup {
  index: number;
  imageKey: string;
}

export interface DirectionGroups {
  items: DirectionGroup[];
}

export const space: RotateCarrierSpacePoint[] = [
  // 1 X 2
  { x: -85, y: -70, w: 165, h: 100 },
  { x: -85, y: 30, w: 165, h: 100 },
  // 2 x 2
  { x: -85, y: -70, w: 82.5, h: 100 },
  { x: -85, y: 30, w: 82.5, h: 100 },
  { x: -2.5, y: -70, w: 82.5, h: 100 },
  { x: -2.5, y: 30, w: 82.5, h: 100 },
  // 2 x 3
  { x: -85, y: -70, w: 82.5, h: 65 },
  { x: -85, y: -5, w: 82.5, h: 65 },
  { x: -85, y: 60, w: 82.5, h: 65 },
  { x: -2.5, y: -70, w: 82.5, h: 65 },
  { x: -2.5, y: -5, w: 82.5, h: 65 },
  { x: -2.5, y: 60, w: 82.5, h: 65 },
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
  findExist: boolean;
  answerDirection: number[];
  space: RotateCarrierSpacePoint[];
  rotation: number;
  rotationAngle: number[];
  carrier: RotateCarrierItemAssets;
  questions: RotateCarrierItemAssets[];
  obstacles: RotateCarrierItemAssets[];
  itemExamples: string[];
  dirrectionExamples: DirectionGroups[];
}

export const RotateCarrierGameLevels: RotateCarrierLevelConfig[] = [
  {
    level: 0,
    findItems: 1,
    obstacle: 0,
    findDirection: false,
    findExist: false,
    answerDirection: [0],
    space: [space[0], space[1]],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [{ imageKey: "item1_0", point: space[0] }],
    obstacles: [],
    itemExamples: ["item0_90", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item1_0" },
          { index: 1, imageKey: "item1_90" },
          { index: 2, imageKey: "item1_180" },
          { index: 3, imageKey: "item1_270" },
        ],
      },
    ],
  },
  {
    level: 1,
    findItems: 1,
    obstacle: 1,
    findDirection: false,
    findExist: false,
    answerDirection: [1],
    space: [space[0], space[1]],
    rotation: 1,
    rotationAngle: [ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [{ imageKey: "item5_0", point: space[1] }],
    obstacles: [{ imageKey: "item1_0", point: space[0] }],
    itemExamples: ["item0_90", "item1_0", "item5_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item5_0" },
          { index: 1, imageKey: "item5_90" },
          { index: 2, imageKey: "item5_180" },
          { index: 3, imageKey: "item5_270" },
        ],
      },
    ],
  },
  {
    level: 2,
    findItems: 1,
    obstacle: 0,
    findDirection: true,
    findExist: false,
    answerDirection: [0],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item1_0",
        point: space[2],
      },
    ],
    obstacles: [],
    itemExamples: ["item0_90", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item1_0" },
          { index: 1, imageKey: "item1_90" },
          { index: 2, imageKey: "item1_180" },
          { index: 3, imageKey: "item1_270" },
        ],
      },
    ],
  },
  {
    level: 3,
    findItems: 1,
    obstacle: 0,
    findDirection: true,
    findExist: false,
    answerDirection: [0],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item1_0",
        point: space[2],
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle0",
        point: space[4],
      },
    ],
    itemExamples: ["obstacle0", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item1_0" },
          { index: 1, imageKey: "item1_90" },
          { index: 2, imageKey: "item1_180" },
          { index: 3, imageKey: "item1_270" },
        ],
      },
    ],
  },
  {
    level: 4,
    findItems: 1,
    obstacle: 0,
    findDirection: true,
    findExist: false,
    answerDirection: [0],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { ...space[2], y: space[2].y + 30, h: 50 },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_90",
        point: space[3],
      },
      {
        imageKey: "item4_0",
        point: space[5],
      },
    ],
    itemExamples: ["item0_90", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item2_0" },
          { index: 1, imageKey: "item2_90" },
          { index: 2, imageKey: "item2_180" },
          { index: 3, imageKey: "item2_270" },
        ],
      },
    ],
  },
  {
    level: 5,
    findItems: 2,
    obstacle: 0,
    findDirection: true,
    findExist: true,
    answerDirection: [0, 3],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_180],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: { ...space[2], y: space[2].y + 10, h: 80 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[5], y: space[5].y + 10, h: 80 },
      },
    ],
    obstacles: [],
    itemExamples: ["item0_0", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item2_0" },
          { index: 1, imageKey: "item2_90" },
          { index: 2, imageKey: "item2_180" },
          { index: 3, imageKey: "item2_270" },
        ],
      },
      {
        items: [
          { index: 0, imageKey: "item4_0" },
          { index: 1, imageKey: "item4_90" },
          { index: 2, imageKey: "item4_180" },
          { index: 3, imageKey: "item4_270" },
        ],
      },
    ],
  },
  {
    level: 6,
    findItems: 2,
    obstacle: 1,
    findDirection: true,
    findExist: true,
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
        point: { ...space[2], y: space[2].y + 10, h: 80 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[5], y: space[5].y + 10, h: 90 },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_90",
        point: {
          ...space[1],
          y: space[1].y + 10,
          w: 80,
          h: 80,
        },
      },
    ],
    itemExamples: ["item0_90", "item1_0", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item2_0" },
          { index: 1, imageKey: "item2_90" },
          { index: 2, imageKey: "item2_180" },
          { index: 3, imageKey: "item2_270" },
        ],
      },
      {
        items: [
          { index: 0, imageKey: "item4_0" },
          { index: 1, imageKey: "item4_90" },
          { index: 2, imageKey: "item4_180" },
          { index: 3, imageKey: "item4_270" },
        ],
      },
    ],
  },
  {
    level: 7,
    findItems: 2,
    obstacle: 2,
    findDirection: true,
    findExist: true,
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
        point: { ...space[2], y: space[2].y + 10, h: 80 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[5], y: space[5].y + 10, h: 90 },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_90",
        point: {
          x: space[3].x,
          y: space[3].y + 10,
          w: 80,
          h: 80,
        },
      },
      {
        imageKey: "obstacle1",
        point: {
          x: space[4].x,
          y: space[4].y + 10,
          w: 80,
          h: 80,
        },
      },
    ],
    itemExamples: ["item0_90", "obstacle1", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item2_0" },
          { index: 1, imageKey: "item2_90" },
          { index: 2, imageKey: "item2_180" },
          { index: 3, imageKey: "item2_270" },
        ],
      },
      {
        items: [
          { index: 0, imageKey: "item4_0" },
          { index: 1, imageKey: "item4_90" },
          { index: 2, imageKey: "item4_180" },
          { index: 3, imageKey: "item4_270" },
        ],
      },
    ],
  },
  {
    level: 8,
    findItems: 2,
    obstacle: 2,
    findDirection: true,
    findExist: true,
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
        point: { x: space[11].x + 10, y: space[11].y + 10, w: 60, h: 50 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[7], h: 60 },
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle1",
        point: {
          x: space[6].x + 10,
          y: space[6].y,
          w: 60,
          h: 60,
        },
      },
    ],
    itemExamples: ["item0_90", "obstacle1", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item2_0" },
          { index: 1, imageKey: "item2_90" },
          { index: 2, imageKey: "item2_180" },
          { index: 3, imageKey: "item2_270" },
        ],
      },
      {
        items: [
          { index: 0, imageKey: "item4_0" },
          { index: 1, imageKey: "item4_90" },
          { index: 2, imageKey: "item4_180" },
          { index: 3, imageKey: "item4_270" },
        ],
      },
    ],
  },
  {
    level: 9,
    findItems: 2,
    obstacle: 2,
    findDirection: true,
    findExist: true,
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
        point: { x: space[11].x + 10, y: space[11].y + 10, w: 60, h: 50 },
      },
      {
        imageKey: "item4_0",
        point: { ...space[7], h: 60 },
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle1",
        point: {
          x: space[6].x + 10,
          y: space[6].y,
          w: 60,
          h: 60,
        },
      },
      {
        imageKey: "item0_90",
        point: {
          x: space[9].x + 10,
          y: space[9].y + 2.5,
          w: 60,
          h: 60,
        },
      },
    ],
    itemExamples: ["item0_90", "obstacle1", "item2_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item2_0" },
          { index: 1, imageKey: "item2_90" },
          { index: 2, imageKey: "item2_180" },
          { index: 3, imageKey: "item2_270" },
        ],
      },
      {
        items: [
          { index: 0, imageKey: "item4_0" },
          { index: 1, imageKey: "item4_90" },
          { index: 2, imageKey: "item4_180" },
          { index: 3, imageKey: "item4_270" },
        ],
      },
    ],
  },
];
