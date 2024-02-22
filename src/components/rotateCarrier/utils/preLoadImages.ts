import {
  RotateCarrierItemAssets,
  RotateCarrierLevelConfig,
} from "@/assets/rotateCarrier/carrierRotateGameConfig";
import { RefObject } from "react";

function loadImage(
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  path: string,
  // file: RotateCarrierItemAssets
  imageKey: string
) {
  const img = new Image();
  img.src = `${path}/${imageKey}.png`;
  img.onload = () => {
    if (!images.current) return;
    images.current[imageKey] = img;
  };
}

export function preLoadImages(
  images: RefObject<{ [key: string]: HTMLImageElement }>
  // config: RotateCarrierLevelConfig
) {
  const path = "/assets/rotateCarrier";
  loadImage(images, path, "carrier");
  // config.obstacles.forEach((file) => loadImage(images, path, file));
  // config.questions.forEach((file) => loadImage(images, path, file));
  for (let i = 0; i < 7; i++) {
    loadImage(images, path, `item${i}_0`);
  }
}

export default preLoadImages;
