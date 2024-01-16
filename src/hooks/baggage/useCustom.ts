import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { BaggageGameConfigState } from "@/atoms/baggage/game";
import {
  BaggageSpeed,
  BaggageLevelConfig,
  BaggageItemAssets,
} from "@/utils/baggage/baggageGameConfig";
import {
  BaggageCustomState,
  Classification,
  Custom,
} from "@/atoms/baggage/custom";

interface params {
  reset: () => void;
}

export function useCustom({ reset }: params) {
  const [speed, setSpeed] = useState(BaggageSpeed.SLOW);
  const [classification, setClassification] = useState(2);
  const [classificationCriteria, setClassificationCriteria] = useState(
    Classification.COLOR
  );
  const [obstacle, setObstacle] = useState(0);
  const [custom, setCustom] = useRecoilState(BaggageCustomState);
  const [level, setLevel] = useState(12);
  const resetConfig = useResetRecoilState(BaggageGameConfigState);
  const setConfig = useSetRecoilState(BaggageGameConfigState);

  useEffect(() => {
    setCustom(clasificationCustom());
  }, [classification, classificationCriteria]);

  useEffect(() => {
    const levelConfig: BaggageLevelConfig = {
      level: 11 + speed + classification + obstacle,
      items: 10,
      speed,
      direction: "forward",
      classification: classification,
      obstacle,
      basket: basketCustum(),
      item: itemCustum(),
      subject: "커스텀 레벨입니다.\n버튼을 사용해서 설정해주세요.",
    };
    setConfig(levelConfig);
    setLevel(levelConfig.level);
    return () => {
      reset();
      resetConfig();
    };
  }, [speed, obstacle, custom]);

  const clasificationCustom = () => {
    if (classification === 2 && classificationCriteria === Classification.COLOR)
      return Custom.COLOR_2;
    else if (
      classification === 2 &&
      classificationCriteria === Classification.TYPE
    )
      return Custom.TYPE_2;
    else if (
      classification === 3 &&
      classificationCriteria === Classification.COLOR
    )
      return Custom.COLOR_3;
    else return Custom.TYPE_3;
  };

  const basketCustum = useCallback(() => {
    const basket: BaggageItemAssets[] =
      custom === Custom.COLOR_2
        ? [
            { imageKey: "carrier_blue", x: 20, y: 300 },
            { imageKey: "carrier_yellow", x: 350, y: 300 },
          ]
        : custom === Custom.TYPE_2
        ? [
            { imageKey: "carrier_gray", x: 20, y: 300 },
            { imageKey: "basket", x: 350, y: 300 },
          ]
        : custom === Custom.COLOR_3
        ? [
            { imageKey: "carrier_blue", x: 20, y: 300 },
            { imageKey: "carrier_yellow", x: 350, y: 300 },
            { imageKey: "carrier_red", x: 150, y: 500 },
          ]
        : [
            { imageKey: "carrier_gray", x: 20, y: 300 },
            { imageKey: "basket", x: 350, y: 300 },
            { imageKey: "bag", x: 160, y: 500 },
          ];
    return basket;
  }, [custom]);

  const itemCustum = useCallback(() => {
    const item: BaggageItemAssets[] =
      custom === Custom.COLOR_2
        ? [
            { imageKey: "item_blue6", x: 0, y: 0 },
            { imageKey: "item_blue2", x: 0, y: 0 },
            { imageKey: "item_blue3", x: 0, y: 0 },
            { imageKey: "item_blue4", x: 0, y: 0 },
            { imageKey: "item_blue5", x: 0, y: 0 },
            { imageKey: "item_yellow1", x: 0, y: 0 },
            { imageKey: "item_yellow2", x: 0, y: 0 },
            { imageKey: "item_yellow3", x: 0, y: 0 },
            { imageKey: "item_yellow4", x: 0, y: 0 },
            { imageKey: "item_yellow5", x: 0, y: 0 },
          ]
        : custom === Custom.TYPE_2
        ? [
            { imageKey: "item_clothes1", x: 0, y: 0 },
            { imageKey: "item_clothes2", x: 0, y: 0 },
            { imageKey: "item_clothes3", x: 0, y: 0 },
            { imageKey: "item_clothes4", x: 0, y: 0 },
            { imageKey: "item_clothes5", x: 0, y: 0 },
            { imageKey: "item_food1", x: 0, y: 0 },
            { imageKey: "item_food2", x: 0, y: 0 },
            { imageKey: "item_food3", x: 0, y: 0 },
            { imageKey: "item_food4", x: 0, y: 0 },
            { imageKey: "item_food5", x: 0, y: 0 },
          ]
        : custom === Custom.COLOR_3
        ? [
            { imageKey: "item_blue6", x: 0, y: 0 },
            { imageKey: "item_blue2", x: 0, y: 0 },
            { imageKey: "item_blue3", x: 0, y: 0 },
            { imageKey: "item_yellow1", x: 0, y: 0 },
            { imageKey: "item_yellow2", x: 0, y: 0 },
            { imageKey: "item_yellow3", x: 0, y: 0 },
            { imageKey: "item_yellow4", x: 0, y: 0 },
            { imageKey: "item_red3", x: 0, y: 0 },
            { imageKey: "item_red4", x: 0, y: 0 },
            { imageKey: "item_red5", x: 0, y: 0 },
          ]
        : [
            { imageKey: "item_clothes5", x: 0, y: 0 },
            { imageKey: "item_clothes2", x: 0, y: 0 },
            { imageKey: "item_clothes3", x: 0, y: 0 },
            { imageKey: "item_clothes4", x: 0, y: 0 },
            { imageKey: "item_food3", x: 0, y: 0 },
            { imageKey: "item_food4", x: 0, y: 0 },
            { imageKey: "item_food5", x: 0, y: 0 },
            { imageKey: "item_acc1", x: 0, y: 0 },
            { imageKey: "item_acc2", x: 0, y: 0 },
            { imageKey: "item_acc3", x: 0, y: 0 },
          ];

    if (obstacle === 1 && custom === Custom.COLOR_2) {
      item.splice(
        4,
        2,
        { imageKey: "item_green1", x: 0, y: 0 },
        { imageKey: "item_red1", x: 0, y: 0 }
      );
    } else if (obstacle === 1 && custom === Custom.TYPE_2) {
      item.splice(
        4,
        2,
        { imageKey: "item_toy1", x: 0, y: 0 },
        { imageKey: "item_toy2", x: 0, y: 0 }
      );
    } else if (obstacle === 1 && custom === Custom.COLOR_3) {
      item.splice(
        6,
        2,
        { imageKey: "item_clothes1", x: 0, y: 0 },
        { imageKey: "item_clothes4", x: 0, y: 0 }
      );
    } else if (obstacle === 1 && custom === Custom.TYPE_3) {
      item.splice(
        3,
        2,
        { imageKey: "item_toy2", x: 0, y: 0 },
        { imageKey: "item_toy3", x: 0, y: 0 }
      );
    }
    return item;
  }, [custom, obstacle]);

  return {
    setSpeed,
    setClassification,
    setClassificationCriteria,
    setObstacle,
    level,
  };
}
