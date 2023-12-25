import { cmToPixels } from "@/utils/unit";
import { drawStaticElements } from "./drawUtils";
import { RefObject, useRef } from "react";

export const startAnimation = (
  canvas: HTMLCanvasElement,
  itemAnimations: RefObject<{ startTime: number; yPosition: number }[]>,
  images: RefObject<{ [key: string]: HTMLImageElement }>
) => {
  const context = canvas.getContext("2d");
  if (!context) return;

  const startPositionY = 100;
  const endPositionY = cmToPixels(8.5);
  const duration = 1000; // 레일을 지나는데 걸리는 시간
  const delay = 1000; // 다음 아이템 등장 시간

  for (let i = 0; i < 5 && itemAnimations.current; i++) {
    itemAnimations.current.push({
      startTime: 0,
      yPosition: 0,
    });
  }

  const animate = (timestamp: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let animateDone = false;

    //정적 요소 그리기
    drawStaticElements(context, images);

    if (!itemAnimations.current) return;
    itemAnimations.current.forEach((item, index) => {
      const itemKey = `item_${index}`;
      const itemImage = images.current ? images.current[itemKey] : null;
      if (!itemImage) return;

      if (item.startTime === 0) item.startTime = timestamp + index * delay; // 지연시간 세팅

      const elapsed = timestamp - item.startTime;
      if (elapsed > 0) {
        const progress = Math.min(1, elapsed / duration);
        item.yPosition = progress * endPositionY; // 현재 y좌표

        if (progress < 1)
          context.drawImage(itemImage, startPositionY, item.yPosition);
        // 애니메이션 종료
        if (progress >= 1 && index == 4) animateDone = true;
      }
    });

    if (!animateDone) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
