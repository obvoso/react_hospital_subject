import { DefaultValue, atom, selector } from "recoil";
import { RouteGameSubject } from "./subject";
import { Route } from "next";

export const routeGameState = atom({
  key: "routeGameState",
  default: {
    start: false,
  },
});

export const vehicleSpeedState = atom({
  key: "vehicleSpeedState",
  default: 0,
});

export const subjectState = atom<RouteGameSubject>({
  key: "subjectState",
  default: {
    fullSubject: "",
    typing: "",
    index: 0,
  },
});
