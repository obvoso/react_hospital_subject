import { BaggageStatus } from "@/utils/constEnum";
import { cmToPixels } from "@/utils/unit";
import { ItemAnimation } from "../BaggageCanvas";

interface KeyPressProps {
  pressedKey: string;
  itemAnimations: ItemAnimation[];
  score: number;
  setScore: (score: number) => void;
  setItemAnimations: (
    updateFunction: (prevItems: ItemAnimation[]) => ItemAnimation[]
  ) => void;
  lastScoredItemIndex: number;
  setLastScoredItemIndex: (index: number) => void;
}

const checkForMatchAndScore = ({
  pressedKey,
  itemAnimations,
  score,
  setScore,
  setItemAnimations,
  lastScoredItemIndex,
  setLastScoredItemIndex,
}: KeyPressProps) => {
  const startPointY = 50;
  const endPositionY = cmToPixels(8.5) - 80;
  const currentItemIndex = itemAnimations.findIndex(
    (item) =>
      item.done === false &&
      item.yPosition >= startPointY &&
      item.yPosition <= endPositionY
  );

  if (currentItemIndex === -1 || currentItemIndex === lastScoredItemIndex)
    return;

  const currentItem = itemAnimations[currentItemIndex];
  if (currentItem.done) return;

  const pressKey =
    pressedKey === "ArrowLeft"
      ? BaggageStatus.LEFT
      : pressedKey === "ArrowRight"
      ? BaggageStatus.RIGHT
      : pressedKey === "ArrowDown"
      ? BaggageStatus.DOWN
      : BaggageStatus.PASS;

  if (
    currentItem.status === pressKey &&
    currentItem.status !== BaggageStatus.PASS
  ) {
    setScore(score + 1);
    setLastScoredItemIndex(currentItemIndex);
  }
  setItemAnimations((prevItems: ItemAnimation[]) => {
    return prevItems.map((item) => {
      if (item === currentItem) {
        return { ...item, done: true };
      }
      return item;
    });
  });
};

export default checkForMatchAndScore;
