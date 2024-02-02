import { showRotueLineState } from "@/atoms/route/custom";
import { routeGameState } from "@/atoms/route/game";
import { Toggle } from "@/utils/Toggle";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function ShowRouteLineToggle() {
  const [showRouteLine, setShowRouteLine] = useRecoilState(showRotueLineState);
  const gameState = useRecoilValue(routeGameState);

  return (
    <div className="min-w-max">
      <Toggle
        label="이동 경로 보기"
        isOn={showRouteLine}
        handleToggle={() => setShowRouteLine(!showRouteLine)}
        disabled={gameState.start}
      />
    </div>
  );
}
