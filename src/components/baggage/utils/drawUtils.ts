import { BaggageLevelConfig } from "@/utils/baggage/baggageGameConfig";
import { cmToPixels } from "@/utils/unit";
import { RefObject } from "react";

const drawStaticElements = (
  context: CanvasRenderingContext2D,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: BaggageLevelConfig
) => {
  if (!context || !images.current) return;

  const conveyorImage = images.current["conveyor"];
  const personImage = images.current["person"];

  if (conveyorImage)
    context.drawImage(conveyorImage, 140, 0, cmToPixels(4), cmToPixels(8.5));

  if (personImage)
    context.drawImage(
      personImage,
      160,
      cmToPixels(8),
      cmToPixels(3),
      cmToPixels(3)
    );

  config.basket.forEach((basket) => {
    if (!images.current) return;

    const basketImage = images.current[basket.imageKey];

    if (!basketImage) return;
    if (basket.x === undefined || basket.y === undefined) return;

    const width = basket.y >= 350 ? cmToPixels(3) : cmToPixels(2);
    const height = basket.y >= 350 ? cmToPixels(2) : cmToPixels(3);
    context.drawImage(basketImage, basket.x, basket.y, width, height);
  });
};

export default drawStaticElements;
