import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { updateTrueGridState } from "@/atoms/route/grid";
import { RouteGameConfigList } from "@/assets/route/routeGameConfig";
import { routeGameState } from "@/atoms/route/game";

export function useGrid(level: number) {
  const updateGrid = useSetRecoilState(updateTrueGridState);
  const [gridInitFlag, setGridInitFlag] = useState<boolean>(false);
  const setGameState = useSetRecoilState(routeGameState);

  useEffect(() => {
    const config = RouteGameConfigList[level];

    updateGrid(config.invalidGrid);
    setGridInitFlag(true);
    setGameState((prev) => ({ ...prev, start: true }));
  }, [level]);

  return { gridInitFlag };
}
