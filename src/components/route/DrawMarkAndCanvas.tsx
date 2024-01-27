import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import React, { useRef } from "react";
import Mark from "./Mark";
import { MapWidth, MapHeight } from "@/type/route/Mark";
import { useAnimate } from "@/hooks/route/useAnimate";

interface DrawMarkAndCanvasProps {
  level: number;
  mark: { x: number; y: number; image: string; priority: number }[];
  subjectInitFlag: boolean;
}

const DrawMarkAndCanvas = React.memo(
  ({ level, mark, subjectInitFlag }: DrawMarkAndCanvasProps) => {
    const config = routeGameConfigList[level];
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { animationDone } = useAnimate({
      level,
      canvasRef,
      marks: mark,
      subjectInitFlag,
    });

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
        <Mark marks={mark} level={level} clickAble={animationDone} />
        <canvas ref={canvasRef} width={MapWidth} height={MapHeight}></canvas>
      </div>
    );
  }
);

export default DrawMarkAndCanvas;
