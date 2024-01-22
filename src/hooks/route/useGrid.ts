import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { updateGridState } from "@/atoms/route/grid";
import { RouteGameConfigList } from "@/assets/route/routeGameConfig";

export function useGrid(level: number) {
  const updateGrid = useSetRecoilState(updateGridState);
  const [gridInitFlag, setGridInitFlag] = useState<boolean>(false);

  useEffect(() => {
    const config = RouteGameConfigList[level];

    updateGrid(config.invalidGrid);
    setGridInitFlag(true);
  }, [level]);

  return { gridInitFlag };
}
