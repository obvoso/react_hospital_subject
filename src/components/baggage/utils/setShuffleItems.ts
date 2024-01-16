import {
  BaggageItemAssets,
  BaggageLevelConfig,
} from "@/utils/baggage/baggageGameConfig";
import { BaggageStatus } from "@/utils/constEnum";
import { shuffleArray } from "..";
import { ItemAnimation } from "@/atoms/baggage/animationItem";

interface params {
  config: BaggageLevelConfig;
  setItemAnimations: (item: ItemAnimation[]) => void;
}

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

export const setShuffleItems = ({ config, setItemAnimations }: params) => {
  const newItems = Array.from({ length: config.items }, (_, i) => ({
    yPosition: 0,
    status: keyType(
      config.item[i].imageKey,
      config.direction,
      config.classification,
      config.basket
    ),
    done: false,
    scored: false,
    imageKey: config.item[i].imageKey,
  }));
  setItemAnimations(shuffleArray(newItems));
};
