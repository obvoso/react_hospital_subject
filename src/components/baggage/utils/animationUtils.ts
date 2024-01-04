import { RefObject } from "react";
import { ItemAnimation } from "../BaggageCanvas";
import { cmToPixels } from "@/utils/unit";
import { drawStaticElements } from "../index";
import { BaggageLevelConfig } from "@/utils/baggage/baggageGameConfig";
import { BaggageStatus } from "@/utils/constEnum";

const startAnimation = (
  canvas: HTMLCanvasElement | null,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  start: boolean,
  config: BaggageLevelConfig
) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const startPositionX = 190;
  const endPositionY = cmToPixels(8.5) - 80; // 레일의 끝
  const duration = config.speed; // 레일을 지나는데 걸리는 시간
  const delay = duration * 2; // 다음 아이템 등장 시간
  const itemSize = 80;

  const animate = (timestamp: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStaticElements(context, images, config);

    if (start) {
      let animateDone = false;
      let updatedAnimations = itemAnimations.map((item, index) => {
        if (item.done) return item;

        if (images.current === null) return item;
        const itemImage = images.current[item.imageKey];
        if (!itemImage) return item;

        const startTime =
          item.startTime === 0
            ? timestamp + (index + 0.5) * delay
            : item.startTime;
        const elapsed = timestamp - startTime;
        const progress =
          startTime > timestamp ? 0 : Math.min(1, elapsed / duration);
        const yPosition = progress * endPositionY;
        if (progress < 1 && 0 < progress)
          context.drawImage(
            itemImage,
            startPositionX,
            yPosition,
            itemSize,
            itemSize
          );

        if (progress >= 1 && index === itemAnimations.length - 1)
          animateDone = true;

        return {
          ...item,
          startTime: startTime,
          yPosition: yPosition,
          // PASS는 done을 false로 유지, useGameControl 훅에서 done을 true로 변경 후 점수 증가
          done: progress >= 1 && item.status !== BaggageStatus.PASS,
        };
      });

      setItemAnimations(updatedAnimations);

      if (!animateDone) {
        requestAnimationFrame(animate);
      }
    }
  };
  requestAnimationFrame(animate);
};

export default startAnimation;
