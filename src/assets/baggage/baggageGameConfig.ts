export const enum BaggageSpeed {
  SPEED0 = 1.5, // 매우 느림
  SPEED1 = 2, // 느림
  SPEED2 = 2.5, // 조금 느림
  SPEED3 = 3, //보통
  SPEED4 = 4, //조금 빠름
  SPEED5 = 5, //빠름
}

export interface BaggageItemAssets {
  imageKey: string;
  x?: number;
  y?: number;
}

export interface BaggageLevelConfig {
  level: number;
  items: number;
  speed: number;
  direction: string;
  classification: number;
  obstacle: number;
  subject: string;
  basket: BaggageItemAssets[];
  item: BaggageItemAssets[];
}

export const baggageGameLevels: BaggageLevelConfig[] = [
  //엽습문제
  {
    level: 0,
    classification: 2,
    speed: BaggageSpeed.SPEED1,
    items: 5,
    direction: "forward",
    obstacle: 0,
    subject:
      "왼쪽, 오른쪽 버튼을 사용하여 같은 색깔의 짐을 챙겨 주세요!\n하단의 검역소에 정확히 도착하면 점수가 올라갑니다.",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_blue6", x: 0, y: 0 },
      { imageKey: "item_blue2", x: 0, y: 0 },
      { imageKey: "item_yellow1", x: 0, y: 0 },
      { imageKey: "item_yellow2", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
    ],
  },
  {
    level: 1,
    classification: 2,
    speed: BaggageSpeed.SPEED1,
    items: 5,
    direction: "forward",
    obstacle: 1,
    subject:
      "이번에도 같은 색깔의 짐을 챙겨 주세요!\n단, 다른 색깔의 짐은 무시하세요.",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_blue3", x: 0, y: 0 },
      { imageKey: "item_blue4", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
      { imageKey: "item_yellow4", x: 0, y: 0 },
      { imageKey: "item_red1", x: 0, y: 0 },
    ],
  },
  //본문제
  {
    level: 2,
    classification: 2,
    speed: BaggageSpeed.SPEED3,
    items: 10,
    direction: "forward",
    obstacle: 0,
    subject: "이번에는 속도가 조금 빨라집니다.",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_blue6", x: 0, y: 0 },
      { imageKey: "item_blue2", x: 0, y: 0 },
      { imageKey: "item_blue3", x: 0, y: 0 },
      { imageKey: "item_blue4", x: 0, y: 0 },
      { imageKey: "item_blue5", x: 0, y: 0 },
      { imageKey: "item_yellow1", x: 0, y: 0 },
      { imageKey: "item_yellow2", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
      { imageKey: "item_yellow4", x: 0, y: 0 },
      { imageKey: "item_yellow5", x: 0, y: 0 },
    ],
  },
  {
    level: 3,
    classification: 2,
    speed: BaggageSpeed.SPEED3,
    items: 10,
    direction: "forward",
    obstacle: 2,
    subject: "이번에도 다른 색깔의 짐은 무시하세요.",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_blue6", x: 0, y: 0 },
      { imageKey: "item_blue2", x: 0, y: 0 },
      { imageKey: "item_blue3", x: 0, y: 0 },
      { imageKey: "item_blue4", x: 0, y: 0 },
      { imageKey: "item_yellow1", x: 0, y: 0 },
      { imageKey: "item_yellow2", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
      { imageKey: "item_yellow4", x: 0, y: 0 },
      { imageKey: "item_green1", x: 0, y: 0 },
      { imageKey: "item_red1", x: 0, y: 0 },
    ],
  },
  {
    level: 4,
    classification: 2,
    speed: BaggageSpeed.SPEED3,
    items: 10,
    direction: "backward",
    obstacle: 0,
    subject: "이번에는 반대의 색깔로 짐을 챙겨야합니다.",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_blue6", x: 0, y: 0 },
      { imageKey: "item_blue2", x: 0, y: 0 },
      { imageKey: "item_blue3", x: 0, y: 0 },
      { imageKey: "item_blue4", x: 0, y: 0 },
      { imageKey: "item_blue5", x: 0, y: 0 },
      { imageKey: "item_yellow1", x: 0, y: 0 },
      { imageKey: "item_yellow2", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
      { imageKey: "item_yellow4", x: 0, y: 0 },
      { imageKey: "item_yellow5", x: 0, y: 0 },
    ],
  },
  {
    level: 5,
    classification: 2,
    speed: BaggageSpeed.SPEED3,
    items: 10,
    direction: "backward",
    obstacle: 2,
    subject:
      "이번에도 반대의 색깔로 짐을 챙겨주세요.\n단, 다른 색깔의 짐은 무시하세요",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_blue6", x: 0, y: 0 },
      { imageKey: "item_blue2", x: 0, y: 0 },
      { imageKey: "item_blue3", x: 0, y: 0 },
      { imageKey: "item_blue4", x: 0, y: 0 },
      { imageKey: "item_yellow1", x: 0, y: 0 },
      { imageKey: "item_yellow2", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
      { imageKey: "item_yellow4", x: 0, y: 0 },
      { imageKey: "item_green1", x: 0, y: 0 },
      { imageKey: "item_red1", x: 0, y: 0 },
    ],
  },
  {
    level: 6,
    classification: 3,
    speed: BaggageSpeed.SPEED5,
    items: 10,
    direction: "forward",
    obstacle: 0,
    subject: "이번에는 색깔이 하나 더 많습니다.",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
      { imageKey: "carrier_red", x: 150, y: 500 },
    ],
    item: [
      { imageKey: "item_blue6", x: 0, y: 0 },
      { imageKey: "item_blue2", x: 0, y: 0 },
      { imageKey: "item_blue3", x: 0, y: 0 },
      { imageKey: "item_yellow1", x: 0, y: 0 },
      { imageKey: "item_yellow2", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
      { imageKey: "item_yellow4", x: 0, y: 0 },
      { imageKey: "item_red3", x: 0, y: 0 },
      { imageKey: "item_red4", x: 0, y: 0 },
      { imageKey: "item_red5", x: 0, y: 0 },
    ],
  },
  {
    level: 7,
    classification: 3,
    speed: BaggageSpeed.SPEED5,
    items: 10,
    direction: "forward",
    obstacle: 3,
    subject: "이번에도 다른 색깔의 짐은 무시하세요.",
    basket: [
      { imageKey: "carrier_blue", x: 20, y: 300 },
      { imageKey: "carrier_yellow", x: 350, y: 300 },
      { imageKey: "carrier_red", x: 150, y: 500 },
    ],
    item: [
      { imageKey: "item_blue2", x: 0, y: 0 },
      { imageKey: "item_blue3", x: 0, y: 0 },
      { imageKey: "item_yellow2", x: 0, y: 0 },
      { imageKey: "item_yellow3", x: 0, y: 0 },
      { imageKey: "item_red3", x: 0, y: 0 },
      { imageKey: "item_red4", x: 0, y: 0 },
      { imageKey: "item_red5", x: 0, y: 0 },
      { imageKey: "item_green1", x: 0, y: 0 },
      { imageKey: "item_clothes1", x: 0, y: 0 },
      { imageKey: "item_clothes4", x: 0, y: 0 },
    ],
  },
  {
    level: 8,
    classification: 2,
    speed: BaggageSpeed.SPEED5,
    items: 10,
    direction: "forward",
    obstacle: 0,
    subject:
      "이번에는 옷과 음식을 나눠 챙겨야합니다.\n캐리어에는 옷을 담고, 바구니에는 음식을 담아주세요!",
    basket: [
      { imageKey: "carrier_gray", x: 20, y: 300 },
      { imageKey: "basket", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_clothes1", x: 0, y: 0 },
      { imageKey: "item_clothes2", x: 0, y: 0 },
      { imageKey: "item_clothes3", x: 0, y: 0 },
      { imageKey: "item_clothes4", x: 0, y: 0 },
      { imageKey: "item_clothes5", x: 0, y: 0 },
      { imageKey: "item_food1", x: 0, y: 0 },
      { imageKey: "item_food2", x: 0, y: 0 },
      { imageKey: "item_food3", x: 0, y: 0 },
      { imageKey: "item_food4", x: 0, y: 0 },
      { imageKey: "item_food5", x: 0, y: 0 },
    ],
  },
  {
    level: 9,
    classification: 2,
    speed: BaggageSpeed.SPEED5,
    items: 10,
    direction: "forward",
    obstacle: 3,
    subject: "이번에도 옷과 음식을 챙겨주세요!\n단 장난감은 무시하세요.",
    basket: [
      { imageKey: "carrier_gray", x: 20, y: 300 },
      { imageKey: "basket", x: 350, y: 300 },
    ],
    item: [
      { imageKey: "item_clothes1", x: 0, y: 0 },
      { imageKey: "item_clothes2", x: 0, y: 0 },
      { imageKey: "item_clothes3", x: 0, y: 0 },
      { imageKey: "item_clothes4", x: 0, y: 0 },
      { imageKey: "item_food1", x: 0, y: 0 },
      { imageKey: "item_food2", x: 0, y: 0 },
      { imageKey: "item_food3", x: 0, y: 0 },
      { imageKey: "item_toy1", x: 0, y: 0 },
      { imageKey: "item_toy2", x: 0, y: 0 },
      { imageKey: "item_toy3", x: 0, y: 0 },
    ],
  },
  {
    level: 10,
    classification: 3,
    speed: BaggageSpeed.SPEED5,
    items: 10,
    direction: "forward",
    obstacle: 0,
    subject:
      "이번에는 악세서리가 추가되었어요!\n손가방에는 악세서리를 담아주세요!",
    basket: [
      { imageKey: "carrier_gray", x: 20, y: 300 },
      { imageKey: "basket", x: 350, y: 300 },
      { imageKey: "bag", x: 160, y: 500 },
    ],
    item: [
      { imageKey: "item_clothes5", x: 0, y: 0 },
      { imageKey: "item_clothes2", x: 0, y: 0 },
      { imageKey: "item_clothes3", x: 0, y: 0 },
      { imageKey: "item_clothes4", x: 0, y: 0 },
      { imageKey: "item_food3", x: 0, y: 0 },
      { imageKey: "item_food4", x: 0, y: 0 },
      { imageKey: "item_food5", x: 0, y: 0 },
      { imageKey: "item_acc1", x: 0, y: 0 },
      { imageKey: "item_acc2", x: 0, y: 0 },
      { imageKey: "item_acc3", x: 0, y: 0 },
    ],
  },
  {
    level: 11,
    classification: 3,
    speed: BaggageSpeed.SPEED5,
    items: 10,
    direction: "forward",
    obstacle: 2,
    subject:
      "이번에도 옷, 음식, 악세서리를 챙겨주세요!\n단, 장난감은 무시하세요.",
    basket: [
      { imageKey: "carrier_gray", x: 20, y: 300 },
      { imageKey: "basket", x: 350, y: 300 },
      { imageKey: "bag", x: 160, y: 500 },
    ],
    item: [
      { imageKey: "item_clothes5", x: 0, y: 0 },
      { imageKey: "item_clothes2", x: 0, y: 0 },
      { imageKey: "item_clothes3", x: 0, y: 0 },
      { imageKey: "item_food3", x: 0, y: 0 },
      { imageKey: "item_food4", x: 0, y: 0 },
      { imageKey: "item_food5", x: 0, y: 0 },
      { imageKey: "item_acc2", x: 0, y: 0 },
      { imageKey: "item_acc3", x: 0, y: 0 },
      { imageKey: "item_toy2", x: 0, y: 0 },
      { imageKey: "item_toy3", x: 0, y: 0 },
    ],
  },
];
