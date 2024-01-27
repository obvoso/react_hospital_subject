import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import React, { useEffect, useRef, useState } from "react";
import Mark from "./Mark";
import { MapWidth, MapHeight, Mark as IMark } from "@/type/route/Mark";
import { useAnimate } from "@/hooks/route/useAnimate";
import { shuffleArray } from "../baggage";
import { useRandomMark } from "@/hooks/route/useRamdomMark";

interface DrawMarkAndCanvasProps {
  level: number;
  subjectInitFlag: boolean;
  gridInitFlag: boolean;
}

const DrawMarkAndCanvas = React.memo(
  ({ level, subjectInitFlag, gridInitFlag }: DrawMarkAndCanvasProps) => {
    const config = routeGameConfigList[level];
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { mark } = useRandomMark({ level, gridInitFlag });
    const [otherRoute, setOtherRoute] = useState<IMark[]>([]);
    const [currentRoute, setCurrentRoute] = useState<IMark[]>([]);
    const { animationDone } = useAnimate({
      level,
      canvasRef,
      marks: currentRoute,
      subjectInitFlag,
      vehicleAsset: otherRoute.length !== 0 ? "taxi" : "bus",
    });

    // 첫번째 경로 할당
    useEffect(() => {
      setCurrentRoute(mark);
    }, [mark]);

    // 두번째 경로 할당
    useEffect(() => {
      if (config.obstacle && !otherRoute.length && animationDone) {
        const copyArr = mark.slice(0, -1);
        let newRoute: IMark[] = shuffleArray(copyArr).map((item, index) => {
          return {
            ...item,
            priority: index,
          };
        });
        let randomIndex = Math.floor(Math.random() * (newRoute.length - 2));
        newRoute.push({
          ...newRoute[randomIndex],
          priority: newRoute.length,
        });
        const timer = setTimeout(() => {
          setOtherRoute(newRoute);
          setCurrentRoute(newRoute);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [animationDone]);

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
        <Mark marks={currentRoute} level={level} clickAble={animationDone} />
        <canvas ref={canvasRef} width={MapWidth} height={MapHeight}></canvas>
      </div>
    );
  }
);

export default DrawMarkAndCanvas;
