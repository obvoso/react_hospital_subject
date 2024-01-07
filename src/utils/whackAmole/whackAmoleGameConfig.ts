interface WhackAmoleItemPosition {
  x: number;
  y: number;
}

const ItemPosition: WhackAmoleItemPosition[] = [
  //두더지 2마리
  { x: 200, y: 150 },
  { x: 600, y: 150 },
  //두더지  3마리
  { x: 100, y: 150 },
  { x: 400, y: 150 },
  { x: 700, y: 150 },
  // 두더지 4마리
];

export interface WhackAmoleItem {
  id: number;
  position: WhackAmoleItemPosition;
  asset: string;
}

export interface WhackAmoleGameConfig {
  level: number;
  moles: WhackAmoleItem[];
  items: number;
  speed: number;
  disappearance: boolean;
  findItems: WhackAmoleItem[];
  answerItems: string[];
}

export const whackAmoleGameConfig: WhackAmoleGameConfig[] = [
  {
    level: 0,
    moles: [
      {
        id: 0,
        position: ItemPosition[0],
        asset: "mole",
      },
      {
        id: 1,
        position: ItemPosition[1],
        asset: "mole",
      },
    ],
    items: 2,
    speed: 1000,
    disappearance: false,
    findItems: [
      {
        id: 0,
        position: ItemPosition[0],
        asset: "item0",
      },
      {
        id: 1,
        position: ItemPosition[1],
        asset: "item1",
      },
      {
        id: 2,
        position: ItemPosition[2],
        asset: "item2",
      },
    ],
    answerItems: ["item0", "item1"],
  },
];
