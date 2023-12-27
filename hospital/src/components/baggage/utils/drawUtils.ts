import { cmToPixels } from "@/utils/unit";
import { RefObject } from "react";

const drawStaticElements = (
  context: CanvasRenderingContext2D,
  images: RefObject<{ [key: string]: HTMLImageElement }>
) => {
  if (!context || !images.current) return;

  const conveyorImage = images.current["conveyor"];
  const carrierBlueImage = images.current["carrier_blue"];
  const carrierYellowImage = images.current["carrier_yellow"];

  if (conveyorImage) {
    context.drawImage(conveyorImage, 100, 100, cmToPixels(4), cmToPixels(8.5));
  }
  if (carrierBlueImage) {
    context.drawImage(carrierBlueImage, 10, 300, cmToPixels(2), cmToPixels(3));
  }
  if (carrierYellowImage) {
    context.drawImage(
      carrierYellowImage,
      260,
      300,
      cmToPixels(2),
      cmToPixels(3)
    );
  }
};

export default drawStaticElements;
