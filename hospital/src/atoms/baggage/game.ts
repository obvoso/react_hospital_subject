import { atom } from "recoil";

export const BaggageGameState = atom({
  key: "BaggageGameState",
  default: {
    score: 0,
    start: false,
  },
});
