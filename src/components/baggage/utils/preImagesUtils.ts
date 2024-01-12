import { RefObject } from "react";
import { BaggageLevelConfig } from "@/utils/baggage/baggageGameConfig";
import { ItemAnimation } from "@/atoms/baggage/animationItem";
import { setShuffleItems } from "./setShuffleItems";

export const preloadImages = (
  canvasRef: RefObject<HTMLCanvasElement>,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  config: BaggageLevelConfig,
  drawStaticElements: (
    context: CanvasRenderingContext2D,
    images: RefObject<{ [key: string]: HTMLImageElement }>,
    config: BaggageLevelConfig
  ) => void
) => {
  staticImagesPreload(images, config);
  let imagesToLoad = config.items;

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
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext("2d");
        if (!context) return;
        drawStaticElements(context, images, config);
      }
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${file}`);
      imagesToLoad--;
    };
    img.src = `/assets/baggage/${file.imageKey}.png`;
  });
};

const staticImagesPreload = (
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: BaggageLevelConfig
) => {
  const conveyorImage = new Image();

  conveyorImage.onload = () => {
    if (!images.current) return;
    images.current["conveyor"] = conveyorImage;
  };
  conveyorImage.src = "/assets/baggage/conveyor.png";

  const personImage = new Image();

  personImage.onload = () => {
    if (!images.current) return;
    images.current["person"] = personImage;
  };
  personImage.src = "/assets/baggage/person.png";

  config.basket.forEach((file) => {
    const img = new Image();
    img.onload = () => {
      if (!images.current) return;
      images.current[file.imageKey] = img;
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${file}`);
    };
    img.src = `/assets/baggage/${file.imageKey}.png`;
  });
};

export default preloadImages;
