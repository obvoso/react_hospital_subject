import { gridState } from "@/atoms/route/grid";
import { Mark, MarkCellSize } from "@/type/route/Mark";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Cell, Direction } from "@/type/route/routeGameConfigType";
import { getRandomCell } from "@/utils/route/getRandomCell";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { routeGameState } from "@/atoms/route/game";
import { customRouteState } from "@/atoms/route/custom";

interface Props {
  level: number;
  gridInitFlag: boolean;
}

export function useRandomMark({ level, gridInitFlag }: Props) {
  const customRoute = useRecoilValue(customRouteState);
  const config = level < 13 ? routeGameConfigList[level] : customRoute;
  const [grid, setGrid] = useRecoilState(gridState);
  const gameState = useRecoilValue(routeGameState);
  const [mark, setMark] = useState<Mark[]>([]);

  useEffect(() => {
    const randomMark: Cell[] = [];
    if (gridInitFlag && gameState.start) {
      const randomMarkCount = config.mark;
      for (let i = 0; i < randomMarkCount; i++) {
        let cell: Cell = getRandomCell();
        if (
          grid[cell.y][cell.x] ||
          randomMark.some((mark) => mark.x === cell.x && mark.y === cell.y)
        ) {
          --i;
          continue;
        }
        randomMark.push(cell);
      }

      updateMark(randomMark);
    }
    if (!gameState.start && gridInitFlag)
      return () => {
        setMark([]);
      };
  }, [gridInitFlag, gameState.start]);

  function updateMark(randomMark: Cell[]) {
    let count = 0;
    const randomIndex = Math.floor(Math.random() * 3);
    randomMark.forEach((cell) => {
      setMark((prev) => [
        ...prev,
        {
          image: `mark${count + randomIndex}`,
          x: cell.x * MarkCellSize,
          y: cell.y * MarkCellSize,
          priority: count++,
        },
      ]);
    });
    if (config.transit) {
      for (let i = 0; i < config.transit; i++) {
        let randomCell = Math.floor(Math.random() * (randomMark.length - 1));
        console.log(randomCell);
        setMark((prev) => [
          ...prev,
          { ...prev[randomCell], priority: randomMark.length },
        ]);
      }
    }
    if (config.direction === Direction.BACKWARD) {
      setMark((prev) => prev.reverse());
    }
  }
  return { mark };
}
