import { useState, useEffect } from "react";
import { BaggageStatus } from "@/utils/constEnum";
import { useRecoilState } from "recoil";
import {
  ItemAnimation,
  ItemAnimationState,
} from "@/atoms/baggage/animationItem";
import { BaggageGameState, CurrentItemIndex } from "@/atoms/baggage/game";

export const useKeyPress = () => {
  const targetKeys = ["ArrowLeft", "ArrowRight", "ArrowDown"];
  const [keysPressed, setKeysPressed] = useState<boolean[]>(
    targetKeys.map(() => false)
  );
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const [lastScoredItemIndex, setLastScoredItemIndex] = useState<number>(-1);
  const [currentItemIndex, setCurrentItemIndex] =
    useRecoilState(CurrentItemIndex);

  const checkForMatchAndScore = (
    pressedKey: string,
    itemAnimation: ItemAnimation[],
    setItemAnimation: React.Dispatch<React.SetStateAction<ItemAnimation[]>>
  ) => {
    if (
      currentItemIndex === -1 ||
      currentItemIndex === lastScoredItemIndex ||
      currentItemIndex >= itemAnimation.length
    )
      return;
    const currentItem = itemAnimation[currentItemIndex];
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
      currentItem.status !== BaggageStatus.PASS &&
      !currentItem.done &&
      !currentItem.scored
    ) {
      setGameState((prev) => ({ ...prev, score: prev.score + 1 }));
      setLastScoredItemIndex(currentItemIndex);
    }
    setItemAnimation((prevItems) => {
      return prevItems.map((item) => {
        if (item === currentItem) {
          return { ...item, done: true, scored: true };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    const incrementScoreForPassingItems = () => {
      let increaseScore = false;
      itemAnimations.forEach((item) => {
        if (
          item.status === BaggageStatus.PASS &&
          item.done &&
          !item.scored &&
          currentItemIndex > 0
        ) {
          increaseScore = true;
        }
      });

      if (increaseScore) {
        setGameState((prev) => ({ ...prev, score: prev.score + 1 }));
        setItemAnimations((prevItems) => {
          return prevItems.map((item) => {
            if (
              item.status === BaggageStatus.PASS &&
              item.done &&
              !item.scored
            ) {
              return { ...item, scored: true };
            }
            return item;
          });
        });
      }
    };

    const downHandler = ({ key }: KeyboardEvent) => {
      const index = targetKeys.indexOf(key);
      if (index > -1) {
        setKeysPressed((prevKeys) =>
          prevKeys.map((pressed, i) => (i === index ? true : pressed))
        );
        checkForMatchAndScore(key, itemAnimations, setItemAnimations);
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      const index = targetKeys.indexOf(key);
      if (index > -1) {
        setKeysPressed((prevKeys) =>
          prevKeys.map((pressed, i) => (i === index ? false : pressed))
        );
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    incrementScoreForPassingItems();

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keysPressed, itemAnimations, currentItemIndex]);

  return {
    keysPressed,
    checkForMatchAndScore,
  };
};
