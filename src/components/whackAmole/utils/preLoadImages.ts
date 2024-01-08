import {
  WhackAmoleGameConfig,
  WhackAmoleItem,
} from "@/utils/whackAmole/whackAmoleGameConfig";
import { RefObject } from "react";

function loadImage(
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  path: string,
  file: WhackAmoleItem
) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `${path}/${file.asset}.png`;
    img.onload = () => {
      if (!images.current) {
        reject(new Error("The images ref is not currently mounted in the DOM"));
        return;
      }
      images.current[file.asset] = img;
      resolve(img);
    };
  });
}

export function preLoadImages(
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: WhackAmoleGameConfig
) {
  const path = "/assets/whackAmole";
  const background: WhackAmoleItem = {
    id: -1,
    position: { x: 0, y: 0 },
    asset: "background",
  };
  const border: WhackAmoleItem = {
    id: -2,
    position: { x: 0, y: 0 },
    asset: "border",
  };
  const itemsToLoad = [
    background,
    border,
    config.moles[0],
    ...config.findItems,
  ];
  const loadPromises = itemsToLoad.map((item) => loadImage(images, path, item));
  return Promise.all(loadPromises);
}

export default preLoadImages;
