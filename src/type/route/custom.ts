import { Direction } from "./routeGameConfigType";

export const mapOptions = [
  { label: "1", value: "map0" },
  { label: "2", value: "map1" },
  { label: "3", value: "map2" },
];

export const markOptions = [
  { label: "2개", value: 2 },
  { label: "3개", value: 3 },
  { label: "4개", value: 4 },
  { label: "5개", value: 5 },
];

export const directionOptions = [
  { label: "정방향", value: Direction.FORWARD },
  { label: "반대방향", value: Direction.BACKWARD },
];

export const transitOptions = [
  { label: "경유 없음", value: 0 },
  { label: "경유 있음", value: 1 },
];

export const obstacleOptions = [
  { label: "장애물 없음", value: 0 },
  { label: "장애물 있음", value: 1 },
];
