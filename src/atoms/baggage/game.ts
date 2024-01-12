import { atom } from "recoil";
import { BaggageLevelConfig } from "@/utils/baggage/baggageGameConfig";

export const BaggageItemScore = {
  PERFECT: ["PERFECT", 1] as [string, number],
  SLOW: ["SLOW", 0.5] as [string, number],
  FAST: ["FAST", 0.5] as [string, number],
  BAD: ["BAD", 0] as [string, number],
  MISS: ["MISS", 0] as [string, number],
  INIT: ["", 0] as [string, number],
};

export interface IGame {
  score: number;
  start: boolean;
  gameOver: boolean;
  itemScore: [string, number];
}

export const CurrentItemIndex = atom({
  key: "CurrentItemIndex",
  default: 0,
});

export const BaggageGameState = atom({
  key: "BaggageGameState",
  default: {
    score: 0,
    start: false,
    gameOver: false,
    itemScore: BaggageItemScore.INIT,
  },
});

export const BaggageGameConfigState = atom<BaggageLevelConfig>({
  key: "BaggageGameConfigState",
  default: {
    level: -1,
    items: 0,
    speed: 0,
    timeLimit: 0,
    direction: "",
    classification: 0,
    obstacle: 0,
    basket: [],
    item: [],
    subject: "",
  },
});
