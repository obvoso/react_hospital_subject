import { atom } from "recoil";

export const enum Custom {
  COLOR_2 = 1,
  COLOR_3 = 2,
  TYPE_2 = 3,
  TYPE_3 = 4,
}

export const enum Classification {
  COLOR = 1,
  TYPE = 2,
}

export const BaggageCustomState = atom({
  key: "baggageCustomState",
  default: Custom.COLOR_2,
});
