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
  item: RotateCarrierItemAssets[];
  example: RotateCarrierItemAssets[];
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
    rotation: 2,
    rotationAngle: [1, 2],
    item: [
      { imageKey: "carrier", point: { x: 0, y: 0, w: 300, h: 400 } },
      { imageKey: "item1_0", point: { x: -120, y: -150, w: 190, h: 95 } },
    ],
    example: [{ imageKey: "item1_0", point: { x: 0, y: 0, w: 0, h: 0 } }],
  },
];
