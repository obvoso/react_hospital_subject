import { customRouteState } from "@/atoms/route/custom";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function useCustomRoute() {
  const [customRoute, setCustomRoute] = useRecoilState(customRouteState);

  useEffect(() => {
    const isObstacle = customRoute.obstacle ? 2 : 3;
    setCustomRoute((prev) => ({
      ...prev,
      level:
        10 +
        customRoute.mark +
        customRoute.direction +
        customRoute.transit +
        isObstacle +
        customRoute.speed,
    }));
  }, [
    customRoute.mark,
    customRoute.direction,
    customRoute.transit,
    customRoute.obstacle,
    customRoute.speed,
  ]);

  return customRoute.level;
}
