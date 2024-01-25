import React, { useState } from "react";
import Canvas from "./Canvas";
import Mark from "./Mark";
import { useRandomMark } from "@/hooks/route/useRamdomMark";
import { useGrid } from "@/hooks/route/useGrid";
import { RouteGameConfigList } from "@/assets/route/routeGameConfig";
import Subject from "./Subject";
import GameContolButton from "./GameControlButton";

interface RouteProps {
  level: number;
}

export default function Route({ level }: RouteProps) {
  const config = RouteGameConfigList[level];
  const { gridInitFlag } = useGrid(level);
  const { mark } = useRandomMark({ level, gridInitFlag });
  const [subjectInitFlag, setSubjectInitFlag] = useState(false);
  console.log(mark);
  if (!gridInitFlag || !mark.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-10 gap-y-20">
      <Subject level={level} setSubjectInit={() => setSubjectInitFlag(true)} />
      <div
        className={`flex relative w-[600px] h-[400px] bg-contain ${
          config.background === "map0"
            ? "bg-map0"
            : config.background === "map1"
            ? "bg-map1"
            : "bg-map2"
        }`}
      >
        <Mark marks={mark} level={level} />
        {subjectInitFlag && <Canvas key={level} level={level} marks={mark} />}
      </div>
      <GameContolButton />
    </div>
  );
}
