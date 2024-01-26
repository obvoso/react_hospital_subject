import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import React from "react";
import Mark from "./Mark";
import Canvas from "./Canvas";

interface DrawMarkAndCanvasProps {
  level: number;
  mark: { x: number; y: number; image: string; priority: number }[];
  subjectInitFlag: boolean;
}

export default function DrawMarkAndCanvas({
  level,
  mark,
  subjectInitFlag,
}: DrawMarkAndCanvasProps) {
  const config = routeGameConfigList[level];
  return (
    <div
      className={`flex relative w-[600px] h-[400px] bg-contain ${
        config.background === "map0"
          ? "bg-map0"
          : config.background === "map1"
          ? "bg-map1"
          : "bg-map2"
      }`}
      key={level}
    >
      <Mark
        marks={mark}
        level={level}
        key={mark[0].x + mark[1].x - mark[0].y + level}
      />
      {subjectInitFlag && <Canvas key={level} level={level} marks={mark} />}
    </div>
  );
}
