import { atom } from "recoil";
import { BaggageLevelConfig } from "@/utils/baggage/baggageGameConfig";

export interface IGame {
  score: number;
  start: boolean;
  gameOver: boolean;
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
