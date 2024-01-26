import {
  gridState,
  updateFalseGridState,
  updateTrueGridState,
} from "@/atoms/route/grid";
import { Mark, MarkCellSize } from "@/type/route/Mark";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Cell, Direction } from "@/type/route/routeGameConfigType";
import { getRandomCell } from "@/utils/route/getRandomCell";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { routeGameState } from "@/atoms/route/game";

interface Props {
  level: number;
  gridInitFlag: boolean;
}

export function useRandomMark({ level, gridInitFlag }: Props) {
  const config = routeGameConfigList[level];
  const [grid, setGrid] = useRecoilState(gridState);
  const updateTrueGrid = useSetRecoilState(updateTrueGridState);
  const updateFalseGrid = useSetRecoilState(updateFalseGridState);
  const gameState = useRecoilValue(routeGameState);
  const [mark, setMark] = useState<Mark[]>([]);
  const { cols, rows } = { cols: 4, rows: 6 };

  useEffect(() => {
    const randomMark: Cell[] = [];
    if (gameState.start && gridInitFlag) {
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

      updateTrueGrid(randomMark);
      updateMark(randomMark);
    }
    if (!gameState.start && gridInitFlag) {
      return () => {
        updateFalseGrid(randomMark);
        setMark([]);
      };
    }
  }, [gridInitFlag, gameState.start]);

  function updateMark(randomMark: Cell[]) {
    let count = 0;
    const randomIndex = Math.floor(Math.random() * 3);
    for (let y = 0; y < cols; y++) {
      for (let x = 0; x < rows; x++) {
        if (randomMark.some((cell) => cell.x === x && cell.y === y)) {
          setMark((prev) => [
            ...prev,
            {
              image: `mark${count + randomIndex}`,
              x: x * MarkCellSize,
              y: y * MarkCellSize,
              priority: count++,
            },
          ]);
        }
      }
    }
    if (config.transit) {
      for (let i = 0; i < config.transit; i++) {
        let randomCell = Math.floor(Math.random() * (randomMark.length - 1));
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
