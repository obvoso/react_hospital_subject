import { RefObject } from "react";
import { ItemAnimation } from "../BaggageCanvas";
import { BaggageStatus } from "@/utils/constEnum";
import { shuffleArrayKeepingIndex } from "../index";
import { BaggageLevelConfig } from "@/utils/baggageGameLevels";

export const preloadImages = (
  canvasRef: RefObject<HTMLCanvasElement>,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  config: BaggageLevelConfig
) => {
  staticImagesPreload(images, config);
  let imagesToLoad = config.items - 1;
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
        const newItems = Array.from({ length: config.items }, (_) => ({
          startTime: 0,
          yPosition: 0,
          status: keyType(
            file.imageKey,
            config.direction,
            config.classification,
            config.obstacle
          ),
          done: false,
          imageKey: file.imageKey,
        }));
        setItemAnimations(shuffleArrayKeepingIndex(newItems));
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

function keyType(
  item: string,
  direction: string,
  classification: number,
  obstacle: boolean
): BaggageStatus {
  if (item.includes("blue" || "clothes")) {
    if (direction === "forward") {
      return BaggageStatus.LEFT;
    }
    return BaggageStatus.RIGHT;
  } else if (item.includes("yellow" || "food")) {
    if (direction === "forward") {
      return BaggageStatus.RIGHT;
    }
    return BaggageStatus.LEFT;
  } else if (item.includes("red" || "acc")) {
    if (direction === "forward" && classification === 3 && !obstacle) {
      return BaggageStatus.DOWN;
    }
  }
  return BaggageStatus.PASS;
}

export default preloadImages;
