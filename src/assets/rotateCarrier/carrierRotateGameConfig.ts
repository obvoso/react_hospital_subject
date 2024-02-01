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
    questions: [
      {
        imageKey: "item1_0",
        point: {
          ...space[0],
          x: space[0].x + 40,
          w: 90,
          h: 90,
        },
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
    level: 1,
    findItems: 1,
    obstacle: 0,
    findDirection: false,
    findExist: false,
    answerDirection: [0],
    space: [space[0], space[1]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item1_0",
        point: {
          ...space[0],
          x: space[0].x + 40,
          w: 90,
          h: 90,
        },
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
    level: 2,
    findItems: 1,
    obstacle: 1,
    findDirection: true,
    findExist: false,
    answerDirection: [1],
    space: [space[0], space[1]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item0_0",
        point: {
          ...space[1],
          x: space[1].x + 40,
          w: 90,
          h: 90,
        },
      },
    ],
    obstacles: [
      {
        imageKey: "item1_0",
        point: {
          ...space[0],
          x: space[0].x + 40,
          w: 90,
          h: 90,
        },
      },
    ],
    itemExamples: ["item0_0", "item1_0", "item5_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item0_0" },
          { index: 1, imageKey: "item0_90" },
          { index: 2, imageKey: "item0_180" },
          { index: 3, imageKey: "item0_270" },
        ],
      },
    ],
  },
  {
    level: 3,
    findItems: 1,
    obstacle: 0,
    findDirection: false,
    findExist: false,
    answerDirection: [0],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: {
          x: space[2].x + 10,
          y: space[2].y + 15,
          w: 65,
          h: 65,
        },
      },
    ],
    obstacles: [],
    itemExamples: ["item0_90", "item5_0", "item2_0", "item4_0"],
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
    level: 4,
    findItems: 1,
    obstacle: 1,
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
        point: {
          x: space[2].x + 10,
          y: space[2].y + 15,
          w: 65,
          h: 65,
        },
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle0",
        point: {
          x: space[4].x + 10,
          y: space[4].y + 15,
          w: 65,
          h: 65,
        },
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
    level: 5,
    findItems: 1,
    obstacle: 2,
    findDirection: false,
    findExist: false,
    answerDirection: [0],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item4_0",
        point: {
          x: space[2].x + 10,
          y: space[2].y + 15,
          w: 65,
          h: 65,
        },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_90",
        point: {
          x: space[3].x + 10,
          y: space[3].y + 15,
          w: 65,
          h: 65,
        },
      },
      {
        imageKey: "item5_0",
        point: {
          x: space[5].x + 10,
          y: space[5].y + 15,
          w: 65,
          h: 65,
        },
      },
    ],
    itemExamples: ["item0_90", "item1_0", "item4_0", "item5_0"],
    dirrectionExamples: [
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
    obstacle: 0,
    findDirection: true,
    findExist: true,
    answerDirection: [0, 3],
    space: [space[2], space[3], space[4], space[5]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: {
          x: space[2].x + 10,
          y: space[2].y + 15,
          w: 65,
          h: 65,
        },
      },
      {
        imageKey: "item4_0",
        point: {
          x: space[5].x + 10,
          y: space[5].y + 15,
          w: 65,
          h: 65,
        },
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
    level: 7,
    findItems: 2,
    obstacle: 1,
    findDirection: false,
    findExist: true,
    answerDirection: [1, 4],
    space: [space[6], space[7], space[8], space[9], space[10], space[11]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: {
          x: space[7].x + 15,
          y: space[7].y + 10,
          w: 50,
          h: 50,
        },
      },
      {
        imageKey: "item0_0",
        point: {
          x: space[10].x + 15,
          y: space[10].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    obstacles: [
      {
        imageKey: "item5_0",
        point: {
          x: space[8].x + 15,
          y: space[8].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    itemExamples: ["item5_0", "item1_0", "item2_0", "item0_0"],
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
          { index: 0, imageKey: "item0_0" },
          { index: 1, imageKey: "item0_90" },
          { index: 2, imageKey: "item0_180" },
          { index: 3, imageKey: "item0_270" },
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
    answerDirection: [2, 5],
    space: [space[6], space[7], space[8], space[9], space[10], space[11]],
    rotation: 2,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: {
          x: space[8].x + 15,
          y: space[8].y + 10,
          w: 50,
          h: 50,
        },
      },
      {
        imageKey: "item1_0",
        point: {
          x: space[11].x + 15,
          y: space[11].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    obstacles: [
      {
        imageKey: "item0_0",
        point: {
          x: space[6].x + 15,
          y: space[6].y + 10,
          w: 50,
          h: 50,
        },
      },
      {
        imageKey: "obstacle1",
        point: {
          x: space[9].x + 15,
          y: space[9].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    itemExamples: ["item0_0", "obstacle1", "item2_0", "item1_0"],
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
          { index: 0, imageKey: "item1_0" },
          { index: 1, imageKey: "item1_90" },
          { index: 2, imageKey: "item1_180" },
          { index: 3, imageKey: "item1_270" },
        ],
      },
    ],
  },
  {
    level: 9,
    findItems: 2,
    obstacle: 1,
    findDirection: false,
    findExist: true,
    answerDirection: [1, 5],
    space: [space[6], space[7], space[8], space[9], space[10], space[11]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item2_0",
        point: {
          x: space[11].x + 15,
          y: space[11].y + 10,
          w: 50,
          h: 50,
        },
      },
      {
        imageKey: "item4_0",
        point: {
          x: space[7].x + 15,
          y: space[7].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle1",
        point: {
          x: space[6].x + 15,
          y: space[6].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    itemExamples: ["item0_0", "obstacle1", "item2_0", "item4_0"],
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
    level: 10,
    findItems: 2,
    obstacle: 2,
    findDirection: true,
    findExist: true,
    answerDirection: [3, 5],
    space: [space[6], space[7], space[8], space[9], space[10], space[11]],
    rotation: 3,
    rotationAngle: [ANGLE.ANGLE_90, ANGLE.ANGLE_90, ANGLE.ANGLE_90],
    carrier: { imageKey: "carrier", point: carrier },
    questions: [
      {
        imageKey: "item5_0",
        point: {
          x: space[11].x + 15,
          y: space[11].y + 10,
          w: 50,
          h: 50,
        },
      },
      {
        imageKey: "item4_0",
        point: {
          x: space[9].x + 15,
          y: space[9].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    obstacles: [
      {
        imageKey: "obstacle1",
        point: {
          x: space[6].x + 15,
          y: space[6].y + 10,
          w: 50,
          h: 50,
        },
      },
      {
        imageKey: "item0_90",
        point: {
          x: space[8].x + 15,
          y: space[8].y + 10,
          w: 50,
          h: 50,
        },
      },
    ],
    itemExamples: ["item0_90", "obstacle1", "item5_0", "item4_0"],
    dirrectionExamples: [
      {
        items: [
          { index: 0, imageKey: "item5_0" },
          { index: 1, imageKey: "item5_90" },
          { index: 2, imageKey: "item5_180" },
          { index: 3, imageKey: "item5_270" },
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
