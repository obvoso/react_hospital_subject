import { atom } from "recoil";

export const itemsArray = atom<number[]>({
  key: "itemsArray",
  default: [],
});
