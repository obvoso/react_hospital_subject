import { Mark, MarkCellSize } from "@/type/route/MarkPosition";
import { createGrid, getGridSize, placeBuildings } from "@/utils/utils/grid";
import { useEffect, useState } from "react";

export function useRandomMark() {
  let grid = createGrid();
  const { cols, rows } = getGridSize();
  const [mark, setMark] = useState<Mark[]>([]);

  useEffect(() => {
    placeBuildings(grid, 5);
    initGrid();
  }, []);

  function initGrid() {
    let count = 0;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        if (grid[x][y]) {
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
