import {
  RotateCarrierItemAssets,
  RotateCarrierLevelConfig,
} from "@/assets/rotateCarrier/carrierRotateGameConfig";
import { RefObject } from "react";

function loadImage(
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  path: string,
  file: RotateCarrierItemAssets
) {
  const img = new Image();
  img.src = `${path}/${file.imageKey}.png`;
  img.onload = () => {
    if (!images.current) return;
    images.current[file.imageKey] = img;
  };
}

export function preLoadImages(
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: RotateCarrierLevelConfig
) {
  const path = "/assets/rotateCarrier";

  loadImage(images, path, config.carrier);
  // config.obstacles.forEach((file) => loadImage(images, path, file));
  config.questions.forEach((file) => loadImage(images, path, file));
}

export default preLoadImages;
