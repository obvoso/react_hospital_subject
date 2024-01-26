import {
  Direction,
  RouteGameConfig,
  Speed,
} from "@/type/route/routeGameConfigType";
import {
  InvalidGridMap0,
  InvalidGridMap1,
  InvalidGridMap2,
} from "./InvalidGrid";

export const routeGameConfigList: RouteGameConfig[] = [
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
  {
    level: 1,
    mark: 3,
    direction: Direction.FORWARD,
    transit: 1,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap0,
    background: "map0",
    subject:
      "버스로 이동하는 여행 경로를 순서대로 기억해주세요.\n버스가 이동하였던 경로 순서대로 여행지를 눌러주세요.",
  },
  {
    level: 2,
    mark: 4,
    direction: Direction.FORWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap0,
    background: "map0",
    subject:
      "버스로 이동하는 여행 경로를 순서대로 기억해주세요.\n버스가 이동하였던 경로 순서대로 여행지를 눌러주세요.",
  },
  {
    level: 3,
    mark: 4,
    direction: Direction.BACKWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap1,
    background: "map1",
    subject:
      "버스로 이동하는 여행 경로를 잘 기억해주세요.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
  {
    level: 4,
    mark: 4,
    direction: Direction.FORWARD,
    transit: 1,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap0,
    background: "map0",
    subject:
      "버스로 이동하는 여행 경로를 순서대로 기억해주세요.\n버스가 이동하였던 경로 순서대로 여행지를 눌러주세요.",
  },
  {
    level: 5,
    mark: 5,
    direction: Direction.BACKWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap0,
    background: "map0",
    subject:
      "버스로 이동하는 여행 경로를 잘 기억해주세요.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
  {
    level: 6,
    mark: 3,
    direction: Direction.FORWARD,
    transit: 1,
    obstacle: true,
    speed: Speed.FAST,
    invalidGrid: InvalidGridMap2,
    background: "map2",
    subject:
      "각 버스와 택시가 이동하는 경로를 모두 기억해주세요.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
  {
    level: 7,
    mark: 5,
    direction: Direction.BACKWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.FAST,
    invalidGrid: InvalidGridMap2,
    background: "map2",
    subject:
      "버스로 이동하는 여행 경로를 잘 기억해주세요.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
  {
    level: 8,
    mark: 5,
    direction: Direction.BACKWARD,
    transit: 1,
    obstacle: false,
    speed: Speed.FAST,
    invalidGrid: InvalidGridMap2,
    background: "map2",
    subject:
      "버스로 이동하는 여행 경로를 잘 기억해주세요.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
  {
    level: 9,
    mark: 5,
    direction: Direction.FORWARD,
    transit: 0,
    obstacle: true,
    speed: Speed.FAST,
    invalidGrid: InvalidGridMap2,
    background: "map2",
    subject:
      "각 버스와 택시가 이동하는 경로를 모두 기억해주세요.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
  {
    level: 10,
    mark: 5,
    direction: Direction.FORWARD,
    transit: 1,
    obstacle: true,
    speed: Speed.FAST,
    invalidGrid: InvalidGridMap2,
    background: "map2",
    subject:
      "각 버스와 택시가 이동하는 경로를 모두 기억해주세요.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
  // 3단계 영상
  {
    level: 11,
    mark: 2,
    direction: Direction.BACKWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap1,
    background: "map1",
    subject:
      "이번에는 버스가 이동하는 경로를 조금 더 집중해서 기억해주세요.\n버스가 이동하는 경로를 기억해서 마지막 도착지부터 거꾸로 눌러야합니다.\n연습해 볼게요.",
  },
  //3단계 연습
  {
    level: 12,
    mark: 3,
    direction: Direction.BACKWARD,
    transit: 0,
    obstacle: false,
    speed: Speed.SLOW,
    invalidGrid: InvalidGridMap1,
    background: "map1",
    subject:
      "이번에는 한번 연습해보도록 하겠습니다.\n버스가 이동하는 순서를 거꾸로 기억해서 눌러주세요.",
  },
];
