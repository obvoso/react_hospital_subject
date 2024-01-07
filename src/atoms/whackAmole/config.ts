import { WhackAmoleGameConfig } from "@/utils/whackAmole/whackAmoleGameConfig";
import { atom } from "recoil";

export const whackAmoleConfigState = atom<WhackAmoleGameConfig>({
  key: "whackAmoleConfigState",
  default: {
    level: -1,
    moles: [],
    items: 0,
    speed: 0,
    disappearance: false,
    findItems: [],
    answerItems: [],
  },
});
