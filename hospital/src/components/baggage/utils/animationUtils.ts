import { RefObject } from "react";
import { ItemAnimation } from "../BaggageCanvas";
import { cmToPixels } from "@/utils/unit";
import { drawStaticElements } from "../index";
import { BaggageLevelConfig } from "@/utils/baggageGameLevels";

const startAnimation = (
  canvas: HTMLCanvasElement | null,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  start: boolean,
  setGameState: (state: any) => void,
  config: BaggageLevelConfig
) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const startPositionX = 130;
  const endPositionY = cmToPixels(8.5) + 100;
  const duration = config.speed; // 레일을 지나는데 걸리는 시간
  const delay = 1000; // 다음 아이템 등장 시간

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
          item.startTime === 0 ? timestamp + index * delay : item.startTime;
        const elapsed = timestamp - startTime;
        const progress = elapsed > 0 ? Math.min(1, elapsed / duration) : 0;
        const yPosition = progress * endPositionY;

        if (progress < 1 && yPosition >= 50)
          context.drawImage(itemImage, startPositionX, yPosition, 90, 90);

        if (progress >= 1 && index === itemAnimations.length - 1) {
          console.log("animation done");
          animateDone = true;
        }

        return {
          ...item,
          startTime: startTime,
          yPosition: yPosition,
          done: progress >= 1,
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
