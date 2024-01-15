import { atom } from "recoil";

export const whackAmoleGameState = atom({
  key: "whackAmoleGameState",
  default: {
    score: 0,
    start: false,
  },
});

export const whackAmoleMouseState = atom({
  key: "whackAmoleMouseState",
  default: {
    x: 0,
    y: 0,
    visible: false,
  },
});
