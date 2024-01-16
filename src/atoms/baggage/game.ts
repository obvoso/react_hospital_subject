import { atom } from "recoil";
import {
  BaggageLevelConfig,
  BaggageSpeed,
} from "@/utils/baggage/baggageGameConfig";

export const BaggageItemScore = {
  PERFECT: ["PERFECT", 1] as [string, number],
  SLOW: ["SLOW", 0.5] as [string, number],
  FAST: ["FAST", 0.5] as [string, number],
  BAD: ["BAD", 0] as [string, number],
  MISS: ["MISS", 0] as [string, number],
  INIT: ["", 0] as [string, number],
};

export interface IGame {
  start: boolean;
  gameOver: boolean;
}

export const GameSpeed = atom<BaggageSpeed>({
  key: "GameSpeed",
  default: BaggageSpeed.SLOW,
});

export const ItemScoreState = atom({
  key: "ItemScoreState",
  default: BaggageItemScore.BAD,
});

export const BaggageScore = atom({
  key: "BaggageScore",
  default: 0,
});

export const CurrentItemIndex = atom({
  key: "CurrentItemIndex",
  default: 0,
});

export const BaggageGameState = atom({
  key: "BaggageGameState",
  default: {
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
    direction: "",
    classification: 0,
    obstacle: 0,
    basket: [],
    item: [],
    subject: "",
  },
});
