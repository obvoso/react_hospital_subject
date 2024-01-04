import { RefObject, useEffect, useState } from "react";
import { cmToPixels } from "@/utils/unit";
import { drawStaticElements } from "../../components/baggage/index";
import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import {
  BaggageGameConfigState,
  BaggageGameState,
  CurrentItemIndex,
} from "@/atoms/baggage/game";
import { useRecoilState, useRecoilValue } from "recoil";

interface params {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  images: RefObject<{ [key: string]: HTMLImageElement }>;
}

export const useAnimation = ({ canvasRef, images }: params) => {
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);
  const [currentItemIndex, setCurrentItemIndex] =
    useRecoilState(CurrentItemIndex);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const config = useRecoilValue(BaggageGameConfigState);

  const startAnimation = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    console.log(itemAnimations);

    const startPositionX = 190;
    const endPositionY = cmToPixels(8.5) - 60; // 레일의 끝
    const duration = config.speed; // 레일을 지나는데 걸리는 시간
    const delay = duration; // 다음 아이템 등장 시간
    const itemSize = 80;

    let startTime = 0;

    const animate = (timestamp: number) => {
      if (!canvasRef.current) return;
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawStaticElements(context, images, config);
      if (
        currentItemIndex >= itemAnimations.length ||
        itemAnimations[currentItemIndex].done
      ) {
        return;
      }
      if (gameState.start) {
        const currentItem = itemAnimations[currentItemIndex];
        if (!currentItem) return;

        if (!images.current) return;
        const itemImage = images.current[currentItem.imageKey];
        if (!itemImage) return;

        startTime = startTime === 0 ? timestamp : startTime;
        const elapsed = timestamp - startTime;
        const progress =
          startTime > timestamp ? 0 : Math.min(1, elapsed / duration);
        const yPosition = progress * endPositionY;

        if (yPosition < endPositionY) {
          context.drawImage(
            itemImage,
            startPositionX,
            yPosition,
            itemSize,
            itemSize
          );
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
          setTimeout(() => {
            if (currentItemIndex === itemAnimations.length - 1) return;
            setCurrentItemIndex((prev) => prev + 1);
          }, delay);
          startTime = 0;
        }
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (config.level !== -1 && currentItemIndex <= itemAnimations.length) {
      console.log(currentItemIndex);
      startAnimation();
    }
  }, [config, gameState.start, currentItemIndex]);
};
