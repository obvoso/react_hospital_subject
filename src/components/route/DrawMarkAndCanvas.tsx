import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import React, { useRef, useState } from "react";
import Mark from "./Mark";
import { MapWidth, MapHeight, Mark as IMark } from "@/type/route/Mark";
import { useAnimate } from "@/hooks/route/useAnimate";
import { useRandomMark } from "@/hooks/route/useRamdomMark";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useObstacleRoute from "@/hooks/route/useObstacleRoute";
import { customRouteState } from "@/atoms/route/custom";

interface DrawMarkAndCanvasProps {
  level: number;
  subjectInitFlag: boolean;
  gridInitFlag: boolean;
}

const DrawMarkAndCanvas = ({
  level,
  subjectInitFlag,
  gridInitFlag,
}: DrawMarkAndCanvasProps) => {
  const customRoute = useRecoilValue(customRouteState);
  const config = level < 11 ? routeGameConfigList[level] : customRoute;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mark } = useRandomMark({ level, gridInitFlag });
  const [otherRoute, setOtherRoute] = useState<IMark[]>([]);
  const [currentRoute, setCurrentRoute] = useState<IMark[]>([]);
  const [animationStop, setAnimationStop] = useState(false);
  const { animationDone } = useAnimate({
    level,
    canvasRef,
    marks: currentRoute,
    subjectInitFlag,
    vehicleAsset: otherRoute.length !== 0 ? "taxi" : "bus",
    animationStop,
  });

  useObstacleRoute({
    mark,
    setCurrentRoute,
    otherRoute,
    setOtherRoute,
    animationDone,
    setAnimationStop,
    config,
  });

  console.log(config.background);

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
        marks={currentRoute}
        level={level}
        clickAble={animationDone || animationStop}
      />
      <canvas ref={canvasRef} width={MapWidth} height={MapHeight}></canvas>
    </div>
  );
};

export default DrawMarkAndCanvas;
