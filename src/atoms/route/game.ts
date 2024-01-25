import { atom } from "recoil";

export const routeGameState = atom({
  key: "routeGameState",
  default: {
    start: false,
    restartCount: 0,
  },
});
