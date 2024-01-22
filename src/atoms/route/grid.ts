import { DefaultValue, atom, selector } from "recoil";
import { Cell } from "@/type/route/routeGameConfig";

function createGrid() {
  const { cols, rows } = { cols: 4, rows: 6 };
  const grid = new Array(cols);

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows).fill(false);
  }

  return grid;
}

export const gridState = atom({
  key: "gridState",
  default: createGrid(),
});

function updateGrid(grid: boolean[][], cellsToUpdate: Cell[]): boolean[][] {
  const newGrid = grid.map((row) => [...row]);

  cellsToUpdate.forEach((cell) => {
    newGrid[cell.y][cell.x] = true;
  });

  return newGrid;
}

export const updateGridState = selector({
  key: "updateGridState",
  get: ({ get }) => {
    return get(gridState);
  },
  set: ({ set, get }, cellsToUpdate: Cell[] | DefaultValue) => {
    if (!(cellsToUpdate instanceof DefaultValue)) {
      const currentGrid = get(gridState);
      const newGrid = updateGrid(currentGrid, cellsToUpdate);
      set(gridState, newGrid);
    }
  },
});
