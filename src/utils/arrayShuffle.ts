export function shuffleArray(array: any) {
  let newArray = [...array];
  newArray.sort(() => Math.random() - 0.5);
  return newArray;
}

export default shuffleArray;
