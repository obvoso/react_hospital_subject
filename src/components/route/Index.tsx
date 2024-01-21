import React from "react";
import Canvas from "./Canvas";
import { useRandomMark } from "@/hooks/route/useRamdomMark";
import Mark from "./Mark";

interface RouteProps {
  level: number;
}

export default function Route({ level }: RouteProps) {
  const { mark } = useRandomMark();
  console.log(mark);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>여기는 서브젝트 들어갈듯</div>
      <div className="flex relative w-[600px] h-[400px] bg-map1 bg-contain">
        <Canvas key={level} marks={mark} />
        <Mark marks={mark} />
      </div>
    </div>
  );
}
