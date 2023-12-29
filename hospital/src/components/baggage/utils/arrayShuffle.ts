import { ItemAnimation } from "../BaggageCanvas";

export function shuffleArray(array: ItemAnimation[]) {
  let newArray = [...array];
  newArray.sort(() => Math.random() - 0.5);
  return newArray;
}

export default shuffleArray;
