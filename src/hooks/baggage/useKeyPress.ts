import { useState, useEffect } from "react";
import { BaggageStatus } from "@/utils/constEnum";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ItemAnimation,
  ItemAnimationState,
} from "@/atoms/baggage/animationItem";
import {
  BaggageGameState,
  BaggageItemScore,
  CurrentItemIndex,
} from "@/atoms/baggage/game";

export const useKeyPress = () => {
  const targetKeys = ["ArrowLeft", "ArrowRight", "ArrowDown"];
  const [keysPressed, setKeysPressed] = useState<boolean[]>(
    targetKeys.map(() => false)
  );
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const [lastScoredItemIndex, setLastScoredItemIndex] = useState<number>(-1);
  const [scoreText, setScoreText] = useState<string>("");
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);
  const [currentItemIndex, setCurrentItemIndex] =
    useRecoilState(CurrentItemIndex);

  const updateScoreAndItem = (newScore: number, newText: string) => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + newScore,
    }));
    setLastScoredItemIndex(currentItemIndex);
    setScoreText(newText);
    setItemAnimations((prevItems) => {
      return prevItems.map((item, index) => {
        if (index === currentItemIndex) {
          return { ...item, done: true, scored: true };
        }
        return item;
      });
    });
  };

  const checkForMatchAndScore = (
    pressedKey: string,
    itemAnimation: ItemAnimation[]
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
      !currentItem.done &&
      !currentItem.scored &&
      currentItem.status !== BaggageStatus.PASS
    )
      updateScoreAndItem(gameState.itemScore[1], gameState.itemScore[0]);
    else updateScoreAndItem(BaggageItemScore.BAD[1], BaggageItemScore.BAD[0]);
  };

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      const index = targetKeys.indexOf(key);
      if (index > -1) {
        setKeysPressed((prevKeys) =>
          prevKeys.map((pressed, i) => (i === index ? true : pressed))
        );
        checkForMatchAndScore(key, itemAnimations);
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

    const incrementScoreForPassingItems = () => {
      let pass = false;
      let miss = false;

      itemAnimations.forEach((item, index) => {
        if (item.done && !item.scored && currentItemIndex === index) {
          if (item.status === BaggageStatus.PASS) pass = true;
          else miss = true;
        }
      });

      if (pass) {
        updateScoreAndItem(
          BaggageItemScore.PERFECT[1],
          BaggageItemScore.PERFECT[0]
        );
      }
      if (miss)
        updateScoreAndItem(BaggageItemScore.MISS[1], BaggageItemScore.MISS[0]);
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    incrementScoreForPassingItems();

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keysPressed, itemAnimations, currentItemIndex, gameState]);

  useEffect(() => {
    if (scoreText)
      setTimeout(() => {
        setScoreText("");
      }, 500);
  }, [scoreText]);

  return {
    keysPressed,
    checkForMatchAndScore,
    scoreText,
  };
};
