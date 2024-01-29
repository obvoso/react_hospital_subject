import { InvalidGridMap0, InvalidGridMap1 } from "@/assets/route/InvalidGrid";
import {
  Direction,
  RouteGameConfig,
  Speed,
} from "@/type/route/routeGameConfigType";
import { atom } from "recoil";

export const customRouteState = atom<RouteGameConfig>({
  key: "customRouteState",
  default: {
    level: -1,
    mark: 2,
    direction: Direction.FORWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap0,
    background: "map0",
    subject: "",
  },
});
