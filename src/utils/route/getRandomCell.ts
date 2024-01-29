export function getRandomCell() {
  const x = Math.floor(Math.random() * 6);
  const y = Math.floor(Math.random() * 4);
  return { x, y };
}
