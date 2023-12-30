import { RotateCarrierLevelConfig } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { RefObject } from "react";

export function preLoadImages(
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: RotateCarrierLevelConfig
) {
  config.item.forEach((file) => {
    const img = new Image();
    img.src = `/assets/rotateCarrier/${file.imageKey}.png`;
    img.onload = () => {
      if (!images.current) return;
      images.current[file.imageKey] = img;
    };
  });
}
