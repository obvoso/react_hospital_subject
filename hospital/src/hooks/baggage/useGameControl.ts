import { startAnimation } from "@/components/baggage";
import { ItemAnimation } from "@/components/baggage/BaggageCanvas";
import checkForMatchAndScore from "@/components/baggage/utils/scoreUtils";
import { BaggageLevelConfig } from "@/utils/baggageGameLevels";
import { BaggageStatus } from "@/utils/constEnum";
import { cmToPixels } from "@/utils/unit";
import { useState, useEffect, RefObject } from "react";

interface GameState {
  score: number;
  start: boolean;
}

export const useGameControls = (
  canvasRef: RefObject<HTMLCanvasElement>,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  itemAnimations: ItemAnimation[],
  setItemAnimations: React.Dispatch<React.SetStateAction<ItemAnimation[]>>,
  gameState: GameState,
  setGameState: (state: GameState) => void,
  dpi: number,
  level: number,
  config: BaggageLevelConfig,
  lastScoredItemIndex: number,
  setLastScoredItemIndex: (index: number) => void
) => {
  const handleScore = (direction: string) => {
    checkForMatchAndScore({
      pressedKey: direction,
      itemAnimations: itemAnimations,
      score: gameState.score,
      setScore: () =>
        setGameState({ ...gameState, score: gameState.score + 1 }),
      setItemAnimations: setItemAnimations,
      lastScoredItemIndex: lastScoredItemIndex,
      setLastScoredItemIndex: setLastScoredItemIndex,
      dpi,
    });
  };

  const incrementScoreForPassingItems = () => {
    if (
      itemAnimations.find(
        (item) =>
          item.status === BaggageStatus.PASS &&
          !item.done &&
          item.yPosition >= cmToPixels(dpi, 8.5) - 80
      )
    ) {
      setItemAnimations((prev) =>
        prev.map((item) => {
          if (
            item.status === BaggageStatus.PASS &&
            !item.done &&
            item.yPosition >= cmToPixels(dpi, 8.5) - 80
          ) {
            item.done = true;
            setGameState({ ...gameState, score: gameState.score + 1 });
          }
          return item;
        })
      );
    }
  };

  useEffect(() => {
    startAnimation(
      canvasRef.current,
      itemAnimations,
      setItemAnimations,
      images,
      gameState.start,
      config,
      dpi
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        handleScore(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      incrementScoreForPassingItems();
    };
  }, [itemAnimations, gameState.start, level, config]);

  return handleScore;
};
