import { RefObject } from "react";
import { BaggageLevelConfig } from "@/assets/baggage/baggageGameConfig";
import { ItemAnimation } from "@/atoms/baggage/animationItem";
import { setShuffleItems } from "./setShuffleItems";

export const preloadImages = (
  canvasRef: RefObject<HTMLCanvasElement>,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  config: BaggageLevelConfig,
  setImagesLoaded: (imagesLoaded: boolean) => void
) => {
  let imagesToLoad = config.items;

  if (itemAnimations.length > 0) return;
  config.item.forEach((file) => {
    const img = new Image();
    img.onload = () => {
      if (!images.current) return;

      images.current[file.imageKey] = img;
      imagesToLoad--;
      if (
        imagesToLoad === 0 &&
        canvasRef.current &&
        itemAnimations.length === 0
      ) {
        setShuffleItems({ config, setItemAnimations });
        setImagesLoaded(true);
      }
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${file}`);
      imagesToLoad--;
    };
    img.src = `/assets/baggage/${file.imageKey}.png`;
  });
};

export default preloadImages;
