import { atom } from "recoil";

export const routeGameState = atom({
  key: "routeGameState",
  default: {
    start: false,
  },
});

export const subjectState = atom({
  key: "subjectState",
  default: "",
});
