import { BaggageStatus } from "@/utils/constEnum";
import { atom, useRecoilState } from "recoil";

export interface ItemAnimation {
  startTime: number;
  yPosition: number;
  status: BaggageStatus;
  done: boolean;
  scored: boolean;
  imageKey: string;
}

export const ItemAnimationState = atom<ItemAnimation[]>({
  key: "ItemAnimationState",
  default: [],
});
