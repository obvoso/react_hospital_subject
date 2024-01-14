import { RefObject, useEffect, useRef, useState } from "react";
import { cmToPixels } from "@/utils/unit";
import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import {
  BaggageGameConfigState,
  BaggageGameState,
  BaggageItemScore,
  CurrentItemIndex,
  IGame,
} from "@/atoms/baggage/game";
import { useRecoilState, useRecoilValue } from "recoil";
import { BaggageSpeed } from "@/utils/baggage/baggageGameConfig";

interface params {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  images: RefObject<{ [key: string]: HTMLImageElement }>;
}

interface updateItemScoreParams {
  yPosition: number;
}

export const useAnimation = ({ canvasRef, images }: params) => {
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);
  const itemAnimationsRef = useRef(itemAnimations);
  const [currentItemIndex, setCurrentItemIndex] =
    useRecoilState(CurrentItemIndex);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const gameRef = useRef<IGame>(gameState);
  const config = useRecoilValue(BaggageGameConfigState);
  const showNextItemTime =
    config.speed === BaggageSpeed.SLOW ? 1000 : BaggageSpeed.MEDIUM ? 750 : 500;

  const updateItemScore = ({ yPosition }: updateItemScoreParams) => {
    const startBadZoneY = 1;
    const endBadZoneY = 80;
    const startFastZoneY = 80;
    const endFastZoneY = 125;
    const startPerfectZoneY = 125;
    const endPerfectZoneY = 180;
    const startSlowZoneY = 180;
    const itemSize = 50;

    if (!gameRef.current) return;
    const currentItemScoreText = gameRef.current.itemScore;

    console.log(yPosition);
    if (
      currentItemScoreText === BaggageItemScore.PERFECT &&
      yPosition >= startPerfectZoneY &&
      yPosition + itemSize <= endPerfectZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.FAST &&
      yPosition >= startFastZoneY &&
      yPosition + itemSize <= endFastZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.SLOW &&
      yPosition >= startSlowZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.BAD &&
      yPosition >= startBadZoneY &&
      yPosition + itemSize <= endBadZoneY
    ) {
      return;
    }
    if (
      yPosition >= startPerfectZoneY &&
      yPosition + itemSize <= endPerfectZoneY
    ) {
      console.log("perfect", yPosition);
      setGameState((prev) => ({
        ...prev,
        itemScore: BaggageItemScore.PERFECT,
      }));
    } else if (
      yPosition >= startFastZoneY &&
      yPosition + itemSize <= endFastZoneY
    ) {
      console.log("fast", yPosition);
      setGameState((prev) => ({
        ...prev,
        itemScore: BaggageItemScore.FAST,
      }));
    } else if (yPosition >= startSlowZoneY) {
      console.log("slow", yPosition);
      setGameState((prev) => ({
        ...prev,
        itemScore: BaggageItemScore.SLOW,
      }));
    } else if (
      yPosition >= startBadZoneY &&
      yPosition + itemSize <= endBadZoneY
    ) {
      console.log("bad", yPosition);
      setGameState((prev) => ({
        ...prev,
        itemScore: BaggageItemScore.BAD,
      }));
    }
  };

  const startAnimation = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const startPositionX = 30;
    const endPositionY = cmToPixels(4.5); // 레일의 끝
    const itemSize = 50;

    let yPosition = 0;
    const increaseY = config.speed;

    const animate = () => {
      if (!gameState.start) return;
      if (!canvasRef.current) return;

      const currentItem = itemAnimationsRef.current[currentItemIndex];
      if (!currentItem) return;

      if (!images.current) return;
      const itemImage = images.current[currentItem.imageKey];
      if (!itemImage) {
        return;
      }

      context.clearRect(0, 0, cmToPixels(3), cmToPixels(8));
      if (yPosition < endPositionY && !currentItem.done) {
        context.drawImage(
          itemImage,
          startPositionX,
          yPosition,
          itemSize,
          itemSize
        );
        updateItemScore({ yPosition });
        yPosition += increaseY;
        requestAnimationFrame(animate);
      } else {
        setItemAnimations((prev) =>
          prev.map((item, index) => {
            if (index === currentItemIndex) {
              return {
                ...item,
                yPosition,
                done: true,
              };
            }
            return item;
          })
        );
        // ... 마지막 일 때 인덱스 바로 올리면 마지막 아이템 점수 인정이 안됨
        // ... 그렇다고 showNextItemTime을 늘리면 그 시간 뒤에 게임 종료됨
        if (currentItemIndex === config.items - 1)
          setTimeout(() => {
            setCurrentItemIndex((prev) => prev + 1);
          }, 50);
        else
          setTimeout(() => {
            setCurrentItemIndex((prev) => prev + 1);
          }, showNextItemTime);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!gameState.start) return;
    if (currentItemIndex === 0) {
      setTimeout(() => {
        startAnimation();
      }, showNextItemTime);
    } else if (config.level !== -1 && currentItemIndex < config.items) {
      startAnimation();
    } else if (config.level !== -1 && currentItemIndex === config.items) {
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
      }));
    }
  }, [config, gameState.start, currentItemIndex]);

  useEffect(() => {
    itemAnimationsRef.current = itemAnimations;
  }, [itemAnimations]);

  useEffect(() => {
    gameRef.current = gameState;
  }, [gameState]);
};
