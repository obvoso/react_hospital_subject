import { RefObject, useEffect, useRef } from "react";
import { cmToPixels } from "@/utils/unit";
import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import {
  BaggageGameConfigState,
  BaggageGameState,
  BaggageItemScore,
  CurrentItemIndex,
  GameSpeed,
  ItemScoreState,
} from "@/atoms/baggage/game";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BaggageSpeed } from "@/assets/baggage/baggageGameConfig";

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
  const config = useRecoilValue(BaggageGameConfigState);
  const setItemScore = useSetRecoilState(ItemScoreState);
  const itemScoreRef = useRef(BaggageItemScore.BAD);
  const gameSpeed = useRecoilValue(GameSpeed);

  let showNextItemTime = 0;
  if (gameSpeed === BaggageSpeed.SPEED0) {
    showNextItemTime = 2000;
  } else if (gameSpeed === BaggageSpeed.SPEED1) {
    showNextItemTime = 1750;
  } else if (gameSpeed === BaggageSpeed.SPEED2) {
    showNextItemTime = 1500;
  } else if (gameSpeed === BaggageSpeed.SPEED3) {
    showNextItemTime = 1250;
  } else if (gameSpeed === BaggageSpeed.SPEED4) {
    showNextItemTime = 1000;
  } else if (gameSpeed === BaggageSpeed.SPEED5) {
    showNextItemTime = 750;
  }

  useEffect(() => {
    itemAnimationsRef.current = itemAnimations;
  }, [itemAnimations]);

  const updateItemScore = ({ yPosition }: updateItemScoreParams) => {
    const startFastZoneY = 100;
    const startPerfectZoneY = 165;
    const startSlowZoneY = 190;
    const currentItemScoreText = itemScoreRef.current;

    if (
      currentItemScoreText === BaggageItemScore.BAD &&
      yPosition < startFastZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.PERFECT &&
      yPosition >= startPerfectZoneY &&
      yPosition <= startSlowZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.FAST &&
      yPosition >= startFastZoneY &&
      yPosition < startPerfectZoneY
    ) {
      return;
    }
    if (
      currentItemScoreText === BaggageItemScore.SLOW &&
      yPosition >= startSlowZoneY
    ) {
      return;
    }

    if (yPosition < startFastZoneY) {
      itemScoreRef.current = BaggageItemScore.BAD;
    } else if (yPosition >= startPerfectZoneY && yPosition <= startSlowZoneY) {
      itemScoreRef.current = BaggageItemScore.PERFECT;
    } else if (yPosition >= startFastZoneY && yPosition < startPerfectZoneY) {
      itemScoreRef.current = BaggageItemScore.FAST;
    } else if (yPosition >= startSlowZoneY) {
      itemScoreRef.current = BaggageItemScore.SLOW;
    }
    setItemScore(itemScoreRef.current);
  };

  const startAnimation = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const itemSize = 40;
    const startPositionX = 30;
    const endPositionY = 220; // 레일의 끝
    const increaseY = gameSpeed;
    let yPosition = 0;

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
        context.drawImage(itemImage, startPositionX, yPosition, 80, itemSize);
        updateItemScore({ yPosition });
        requestAnimationFrame(animate);
        yPosition += increaseY;
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
    return () => {
      itemScoreRef.current = BaggageItemScore.BAD;
      setItemScore(itemScoreRef.current);
    };
  }, [config, gameState.start, currentItemIndex]);
};
