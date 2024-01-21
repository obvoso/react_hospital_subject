import { MapHeight, MapWidth, MarkCellSize } from "@/type/route/MarkPosition";

export function getGridSize() {
  const cols = Math.floor(MapWidth / MarkCellSize);
  const rows = Math.floor(MapHeight / MarkCellSize);
  return { cols, rows };
}

export function createGrid() {
  const { cols, rows } = getGridSize();
  const grid = new Array(cols);

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows).fill(false);
  }

  return grid;
}

function getRandomCell() {
  const { cols, rows } = getGridSize();
  const x = Math.floor(Math.random() * cols);
  const y = Math.floor(Math.random() * rows);

  return { x, y };
}

export function placeBuildings(grid: boolean[][], mark: number) {
  let placed = 0;

  while (placed < mark) {
    let { x, y } = getRandomCell();

    if (!grid[x][y]) {
      grid[x][y] = true;
      placed++;
    }
  }
}
