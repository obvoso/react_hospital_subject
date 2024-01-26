import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { updateTrueGridState } from "@/atoms/route/grid";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { routeGameState } from "@/atoms/route/game";

export function useGrid(level: number) {
  const updateGrid = useSetRecoilState(updateTrueGridState);
  const [gridInitFlag, setGridInitFlag] = useState<boolean>(false);
  const setGameState = useSetRecoilState(routeGameState);

  useEffect(() => {
    const config = routeGameConfigList[level];

    updateGrid(config.invalidGrid);
    setGridInitFlag(true);
    setGameState({ start: true });
  }, [level]);

  return { gridInitFlag };
}
