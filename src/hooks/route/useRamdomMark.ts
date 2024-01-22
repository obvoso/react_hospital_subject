import { gridState, updateGridState } from "@/atoms/route/grid";
import { Mark, MarkCellSize } from "@/type/route/Mark";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Cell } from "@/type/route/routeGameConfig";
import { getRandomCell } from "@/utils/route/getRandomCell";
import { RouteGameConfigList } from "@/assets/route/routeGameConfig";

interface Props {
  level: number;
  gridInitFlag: boolean;
}

export function useRandomMark({ level, gridInitFlag }: Props) {
  const [grid, setGrid] = useRecoilState(gridState);
  const updateGrid = useSetRecoilState(updateGridState);
  const { cols, rows } = { cols: 4, rows: 6 };
  const [mark, setMark] = useState<Mark[]>([]);

  useEffect(() => {
    if (!gridInitFlag) return;
    const config = RouteGameConfigList[level];
    const randomMark: Cell[] = [];
    const randomMarkCount = config.mark - config.transit;
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
    updateGrid(randomMark);
    updateMark(randomMark);
  }, [gridInitFlag]);

  function updateMark(randomMark: Cell[]) {
    let count = 0;
    for (let y = 0; y < cols; y++) {
      for (let x = 0; x < rows; x++) {
        if (randomMark.some((cell) => cell.x === x && cell.y === y)) {
          setMark((prev) => [
            ...prev,
            {
              image: `mark${count}`,
              x: x * MarkCellSize,
              y: y * MarkCellSize,
              priority: count++,
            },
          ]);
        }
      }
    }
  }
  return { mark };
}
