import { RefObject } from "react";
import { ItemAnimation } from "../BaggageCanvas";
import { BaggageStatus } from "@/utils/constEnum";
import { drawStaticElements, shuffleArray } from "../index";
import { BaggageLevelConfig } from "@/utils/baggageGameLevels";

export const preloadImages = (
  canvasRef: RefObject<HTMLCanvasElement>,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  config: BaggageLevelConfig
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
        const newItems = Array.from({ length: config.items }, (_, i) => ({
          startTime: 0,
          yPosition: 0,
          status: keyType(
            config.item[i].imageKey,
            config.direction,
            config.classification
          ),
          done: false,
          imageKey: config.item[i].imageKey,
        }));
        setItemAnimations(shuffleArray(newItems));
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

//config에 있는 방향과 분류에 따라서 올바른 키를 정의
function keyType(
  item: string,
  direction: string,
  classification: number
): BaggageStatus {
  if (item.includes("blue") || item.includes("clothes")) {
    if (direction === "forward") {
      return BaggageStatus.LEFT;
    }
    return BaggageStatus.RIGHT;
  } else if (item.includes("yellow") || item.includes("food")) {
    if (direction === "forward") {
      return BaggageStatus.RIGHT;
    }
    return BaggageStatus.LEFT;
  } else if (item.includes("red") || item.includes("acc")) {
    if (direction === "forward" && classification === 3) {
      return BaggageStatus.DOWN;
    }
  }
  return BaggageStatus.PASS;
}

export default preloadImages;
