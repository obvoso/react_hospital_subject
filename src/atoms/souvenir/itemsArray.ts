import { ISouvenir } from "@/type/souvenir/ISouvenir";
import { Body } from "matter-js";
import { atom } from "recoil";

export const itemsArray = atom<number[]>({
  key: "itemsArray",
  default: [],
});

export const currentItemState = atom<ISouvenir | null>({
  key: "currentItem",
  default: null,
});

export const currentBodyState = atom<Body | null>({
  key: "currentBody",
  default: null,
});
