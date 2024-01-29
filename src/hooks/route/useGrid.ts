import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { updateTrueGridState } from "@/atoms/route/grid";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { routeGameState } from "@/atoms/route/game";
import { customRouteState } from "@/atoms/route/custom";

export function useGrid(level: number) {
  const updateGrid = useSetRecoilState(updateTrueGridState);
  const [gridInitFlag, setGridInitFlag] = useState<boolean>(false);
  const setGameState = useSetRecoilState(routeGameState);
  const customRoute = useRecoilValue(customRouteState);

  useEffect(() => {
    const config = level < 13 ? routeGameConfigList[level] : customRoute;

    updateGrid(config.invalidGrid);
    setGridInitFlag(true);
    if (level < 13) {
      setGameState({ start: true });
    }
  }, [level]);

  return { gridInitFlag };
}
