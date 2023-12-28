import { atom } from "recoil";
import { BaggageLevelConfig } from "@/utils/baggageGameLevels";

export const DpiState = atom({
  key: "DpiState",
  default: 0,
});

export const BaggageGameState = atom({
  key: "BaggageGameState",
  default: {
    score: 0,
    start: false,
  },
});

export const BaggageGameConfigState = atom<BaggageLevelConfig>({
  key: "BaggageGameConfigState",
  default: {
    level: 0,
    items: 5,
    speed: 1000,
    timeLimit: 30,
    direction: "forward",
    classification: 2,
    obstacle: 0,
    basket: [],
    item: [],
    subject: "",
  },
});
