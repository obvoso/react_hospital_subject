import { RefObject } from "react";
import { ItemAnimation } from "./BaggageCanvas";
import { cmToPixels } from "@/utils/unit";
import { drawStaticElements } from "./index";

const startAnimation = (
  canvas: HTMLCanvasElement | null,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  images: RefObject<{ [key: string]: HTMLImageElement }>
) => {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const startPositionY = 100;
  const endPositionY = cmToPixels(8.5);
  const duration = 1000; // 레일을 지나는데 걸리는 시간
  const delay = 1000; // 다음 아이템 등장 시간

  const animate = (timestamp: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStaticElements(context, images);

    let animateDone = false;
    let updatedAnimations = itemAnimations.map((item, index) => {
      if (item.done) return item;

      const itemKey = `item_${index}`;
      if (!images.current) return item;
      const itemImage = images.current[itemKey];
      if (!itemImage) return item;

      const startTime =
        item.startTime === 0 ? timestamp + index * delay : item.startTime;
      const elapsed = timestamp - startTime;
      const progress = elapsed > 0 ? Math.min(1, elapsed / duration) : 0;
      const yPosition = progress * endPositionY;

      if (progress < 1) context.drawImage(itemImage, startPositionY, yPosition);

      if (progress >= 1 && index === itemAnimations.length - 1)
        animateDone = true;

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
  };

  requestAnimationFrame(animate);
};

export default startAnimation;
