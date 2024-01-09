import { RefObject, useEffect, useRef, useState } from "react";
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
  const itemAnimationsRef = useRef(itemAnimations);
  const [currentItemIndex, setCurrentItemIndex] =
    useRecoilState(CurrentItemIndex);
  const [gameState, setGameState] = useRecoilState(BaggageGameState);
  const config = useRecoilValue(BaggageGameConfigState);

  const startAnimation = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const startPositionX = 190;
    const endPositionY = cmToPixels(8.5) - 60; // 레일의 끝
    const duration = config.speed; // 레일을 지나는데 걸리는 시간
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
      if (currentItemIndex >= config.items) {
        return;
      }
      if (gameState.start) {
        const currentItem = itemAnimationsRef.current[currentItemIndex];
        if (!currentItem) return;

        if (!images.current) return;
        const itemImage = images.current[currentItem.imageKey];
        if (!itemImage) return;

        startTime = startTime === 0 ? timestamp : startTime;
        const elapsed = timestamp - startTime;
        const progress =
          startTime > timestamp ? 0 : Math.min(1, elapsed / duration);
        const yPosition = progress * endPositionY;

        if (yPosition < endPositionY && !currentItem.done) {
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
          if (currentItemIndex < config.items - 1) {
            setTimeout(() => {
              setCurrentItemIndex((prev) => prev + 1);
            }, config.speed);
          }
          startTime = 0;
        }
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (config.level !== -1 && currentItemIndex < config.items) {
      if (currentItemIndex === 0) {
        setTimeout(() => {
          startAnimation();
        }, config.speed);
      } else {
        startAnimation();
      }
    }
  }, [config, gameState.start, currentItemIndex]);

  useEffect(() => {
    itemAnimationsRef.current = itemAnimations;
  }, [itemAnimations]);
};
