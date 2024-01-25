import { InvalidGridMap0 } from "@/assets/route/InvalidGrid";

export const enum Direction {
  FORWARD = 0,
  BACKWARD = 1,
}

export const enum Speed {
  SLOW = 2,
  FAST = 4,
}

export interface Cell {
  x: number;
  y: number;
}

export interface RouteGameConfig {
  level: number;
  mark: number;
  direction: Direction;
  transit: number;
  obstacle: boolean;
  speed: Speed;
  invalidGrid: Cell[];
  background: string;
  subject: string;
}
