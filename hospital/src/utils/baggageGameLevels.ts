export interface BaggageLevelConfig {
  level: number;
  items: number;
  speed: number;
  timeLimit: number;
  direction?: string;
  classification: number;
  obstacle: boolean;
}

export const baggageGameLevels: BaggageLevelConfig[] = [
  //엽습문제
  {
    level: 0,
    classification: 2,
    speed: 1000,
    items: 5,
    timeLimit: 30,
    obstacle: false,
  },
  {
    level: 1,
    classification: 2,
    speed: 1000,
    items: 5,
    timeLimit: 30,
    obstacle: true,
  },
  //본문제
  {
    level: 2,
    classification: 2,
    speed: 750,
    items: 10,
    timeLimit: 30,
    obstacle: false,
  },
  {
    level: 3,
    classification: 2,
    speed: 750,
    items: 5,
    timeLimit: 30,
    obstacle: true,
  },
  {
    level: 4,
    classification: 2,
    speed: 750,
    items: 10,
    timeLimit: 30,
    direction: "backward",
    obstacle: false,
  },
  {
    level: 5,
    classification: 2,
    speed: 750,
    items: 10,
    timeLimit: 30,
    direction: "backward",
    obstacle: true,
  },
  {
    level: 6,
    classification: 3,
    speed: 500,
    items: 10,
    timeLimit: 40,
    obstacle: false,
  },
  {
    level: 7,
    classification: 3,
    speed: 500,
    items: 10,
    timeLimit: 40,
    obstacle: true,
  },
  {
    level: 8,
    classification: 2,
    speed: 500,
    items: 10,
    timeLimit: 40,
    obstacle: false,
  },
  {
    level: 9,
    classification: 2,
    speed: 500,
    items: 10,
    timeLimit: 40,
    obstacle: true,
  },
  {
    level: 10,
    classification: 3,
    speed: 500,
    items: 10,
    timeLimit: 45,
    obstacle: false,
  },
  {
    level: 11,
    classification: 3,
    speed: 500,
    items: 10,
    timeLimit: 45,
    obstacle: true,
  },
];
