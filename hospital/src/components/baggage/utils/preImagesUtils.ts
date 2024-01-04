import { RefObject } from "react";
import { ItemAnimation } from "../BaggageCanvas";
import { BaggageStatus } from "@/utils/constEnum";
import { shuffleArray } from "../index";
import {
  BaggageLevelConfig,
  BaggageItemAssets,
} from "@/utils/baggage/baggageGameConfig";

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
            config.classification,
            config.basket
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
  classification: number,
  basket: BaggageItemAssets[]
): BaggageStatus {
  const isMatchingBasket = (
    basketIndex: number,
    key: string,
    itemSubstring: string
  ) => basket[basketIndex]?.imageKey === key && item.includes(itemSubstring);

  if (
    isMatchingBasket(0, "carrier_blue", "blue") ||
    isMatchingBasket(0, "carrier_gray", "clothes")
  ) {
    return direction === "forward" ? BaggageStatus.LEFT : BaggageStatus.RIGHT;
  } else if (
    isMatchingBasket(1, "carrier_yellow", "yellow") ||
    isMatchingBasket(1, "basket", "food")
  ) {
    return direction === "forward" ? BaggageStatus.RIGHT : BaggageStatus.LEFT;
  } else if (
    isMatchingBasket(2, "carrier_red", "red") ||
    isMatchingBasket(2, "bag", "acc")
  ) {
    return direction === "forward" && classification === 3
      ? BaggageStatus.DOWN
      : BaggageStatus.PASS;
  }

  return BaggageStatus.PASS;
}

export default preloadImages;
