import { RouteGameConfig } from "@/type/route/routeGameConfigType";
import { atom } from "recoil";

export const customRouteState = atom<RouteGameConfig>({
  key: "customRouteState",
  default: {
    level: -1,
    mark: 0,
    direction: 0,
    transit: 0,
    obstacle: false,
    speed: 7,
    invalidGrid: [],
    background: "",
    subject: "커스텀 페이지 입니다.",
  },
});
