import { BaggageLevelConfig } from "@/utils/baggageGameLevels";
import { cmToPixels } from "@/utils/unit";
import { RefObject } from "react";

const drawStaticElements = (
  context: CanvasRenderingContext2D,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: BaggageLevelConfig,
  dpi: number
) => {
  if (!context || !images.current) return;

  const conveyorImage = images.current["conveyor"];
  const personImage = images.current["person"];

  if (conveyorImage)
    context.drawImage(
      conveyorImage,
      140,
      0,
      cmToPixels(dpi, 4),
      cmToPixels(dpi, 8.5)
    );

  if (personImage)
    context.drawImage(
      personImage,
      160,
      cmToPixels(dpi, 8),
      cmToPixels(dpi, 3),
      cmToPixels(dpi, 3)
    );

  config.basket.forEach((basket) => {
    if (!images.current) return;
    const basketImage = images.current[basket.imageKey];

    if (!basketImage) return;
    if (basket.x === undefined || basket.y === undefined) return;

    const width = basket.y >= 350 ? cmToPixels(dpi, 3) : cmToPixels(dpi, 2);
    const height = basket.y >= 350 ? cmToPixels(dpi, 2) : cmToPixels(dpi, 3);
    context.drawImage(basketImage, basket.x, basket.y, width, height);
  });
};

export default drawStaticElements;
