import { BaggageLevelConfig } from "@/utils/baggage/baggageGameConfig";
import { cmToPixels } from "@/utils/unit";
import { RefObject } from "react";

const drawScoreZone = (context: CanvasRenderingContext2D) => {
  const x = 130;
  const y = cmToPixels(5);
  const width = 200;
  const height = 120;
  const borderRadius = 20;

  context.globalAlpha = 0.4;
  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "green";
  context.lineWidth = 5;

  context.beginPath();
  context.moveTo(x + borderRadius, y);
  context.arcTo(x + width, y, x + width, y + height, borderRadius);
  context.arcTo(x + width, y + height, x, y + height, borderRadius);
  context.arcTo(x, y + height, x, y, borderRadius);
  context.arcTo(x, y, x + width, y, borderRadius);
  context.closePath();

  context.fill();
  context.globalAlpha = 1.0;
  context.stroke();
};

const drawStaticElements = (
  context: CanvasRenderingContext2D,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: BaggageLevelConfig
) => {
  if (!context || !images.current) return;

  context.clearRect(0, 0, 1000, 1000);

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

  drawScoreZone(context);
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
