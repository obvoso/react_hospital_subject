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
  const startPointY = 100;
  const endPositionY = cmToPixels(8.5);

  //console.log(itemAnimations);
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

  const carrierColor =
    pressedKey === "ArrowLeft" ? BaggageStatus.BLUE : BaggageStatus.YELLOW;

  if (currentItem.status === carrierColor) {
    setScore(score + 1);
    setLastScoredItemIndex(currentItemIndex);
    setItemAnimations((prevItems: ItemAnimation[]) => {
      return prevItems.map((item) => {
        if (item === currentItem) {
          return { ...item, done: true, scored: true };
        }
        return item;
      });
    });
  }
};

export default checkForMatchAndScore;
