import { atom } from "recoil";

export const gameScore = atom({
  key: "gameScore",
  default: 0,
});

export const gameStatus = atom({
  key: "gameStatus",
  default: true,
});
