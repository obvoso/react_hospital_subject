import { customRouteState } from "@/atoms/route/custom";
import { routeGameState } from "@/atoms/route/game";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function useCustomRoute() {
  const [customRoute, setCustomRoute] = useRecoilState(customRouteState);
  const setGameState = useSetRecoilState(routeGameState);

  useEffect(() => {
    const isObstacle = customRoute.obstacle ? 2 : 3;
    const background =
      customRoute.background === "map0"
        ? 4
        : customRoute.background === "map1"
        ? 5
        : 6;
    setCustomRoute((prev) => ({
      ...prev,
      level:
        13 +
        background +
        customRoute.mark +
        customRoute.direction +
        customRoute.transit +
        isObstacle +
        customRoute.speed,
    }));
    setGameState({ start: false });
  }, [
    customRoute.mark,
    customRoute.direction,
    customRoute.transit,
    customRoute.obstacle,
    customRoute.speed,
    customRoute.background,
  ]);

  return customRoute.level;
}
