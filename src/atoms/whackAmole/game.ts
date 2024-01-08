import { atom } from "recoil";
import { IGame } from "../baggage/game";

export const whackAmoleGameState = atom<IGame>({
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
