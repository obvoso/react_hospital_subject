import {
  Direction,
  RouteGameConfig,
  Speed,
} from "@/type/route/routeGameConfig";
import { InvalidGridMap0 } from "./InvalidGrid";

export const RouteGameConfigList: RouteGameConfig[] = [
  {
    level: 0,
    mark: 3,
    direction: Direction.FORWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap0,
    background: "map0",
    subject:
      "OO님의 여행계획을 알려드릴게요. 잘 기억해주세요.\n버스가 이동하는 여행지를 순서대로 기억해주세요.",
  },
];
