import { atom } from "recoil";
import { IGame } from "../baggage/game";

const whackAmoleGameState = atom<IGame>({
  key: "whackAmoleGameState",
  default: {
    score: 0,
    start: false,
  },
});
