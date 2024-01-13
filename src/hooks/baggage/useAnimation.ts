import { RefObject, useEffect, useRef, useState } from "react";
import { cmToPixels } from "@/utils/unit";
import { drawStaticElements } from "../../components/baggage/index";
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
    const startScoreZoneY = cmToPixels(5);
    const endScoreZoneY = cmToPixels(5) + 120;
    const itemSize = 80;

    if (!gameRef.current) return;
    const currentItemScoreText = gameRef.current.itemScore;

    if (
      currentItemScoreText === BaggageItemScore.PERFECT &&
      yPosition >= startScoreZoneY &&
      yPosition + itemSize <= endScoreZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.FAST &&
      yPosition < startScoreZoneY &&
      yPosition > 100
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.SLOW &&
      yPosition + itemSize > endScoreZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.BAD &&
      yPosition <= 100 &&
      yPosition > 0
    ) {
      return;
    }

    // 새로운 itemScore를 설정
    if (yPosition >= startScoreZoneY && yPosition + itemSize <= endScoreZoneY) {
      setGameState((prev) => ({
        ...prev,
        itemScore: BaggageItemScore.PERFECT,
      }));
    } else if (yPosition < startScoreZoneY && yPosition > 100) {
      setGameState((prev) => ({
        ...prev,
        itemScore: BaggageItemScore.FAST,
      }));
    } else if (yPosition + itemSize > endScoreZoneY) {
      setGameState((prev) => ({
        ...prev,
        itemScore: BaggageItemScore.SLOW,
      }));
    } else if (yPosition <= 100 && yPosition > 0) {
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

    const startPositionX = 190;
    const endPositionY = cmToPixels(8.5) - 60; // 레일의 끝
    const itemSize = 80;

    let startTime = 0;
    let yPosition = 0;
    const increaseY = config.speed;

    const animate = () => {
      if (!gameState.start) return;
      if (!canvasRef.current) return;

      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawStaticElements(context, images, config);

      const currentItem = itemAnimationsRef.current[currentItemIndex];
      if (!currentItem) return;

      if (!images.current) return;
      const itemImage = images.current[currentItem.imageKey];
      if (!itemImage) return;
      if (yPosition < endPositionY && !currentItem.done) {
        //console.log("yPosition", yPosition);
        context.drawImage(
          itemImage,
          startPositionX,
          yPosition,
          itemSize,
          itemSize
        );
        yPosition += increaseY;
        updateItemScore({ yPosition });
        requestAnimationFrame(animate);
      } else {
        setItemAnimations((prev) =>
          prev.map((item, index) => {
            if (index === currentItemIndex) {
              return {
                ...item,
                yPosition,
                startTime,
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
        startTime = 0;
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
