import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BaggageGameConfigState, GameSpeed } from "@/atoms/baggage/game";
import {
  BaggageLevelConfig,
  BaggageItemAssets,
} from "@/utils/baggage/baggageGameConfig";
import {
  BaggageCustomState,
  Classification,
  Custom,
} from "@/atoms/baggage/custom";

export function useCustom() {
  const [speed, setSpeed] = useRecoilState(GameSpeed);
  const [classification, setClassification] = useState(2);
  const [classificationCriteria, setClassificationCriteria] = useState(
    Classification.COLOR
  );
  const [obstacle, setObstacle] = useState(0);
  const [custom, setCustom] = useRecoilState(BaggageCustomState);
  const [level, setLevel] = useState(12);
  const setConfig = useSetRecoilState(BaggageGameConfigState);

  useEffect(() => {
    setCustom(clasificationCustom());
  }, [classification, classificationCriteria]);

  useEffect(() => {
    const levelConfig: BaggageLevelConfig = {
      level: 11 + speed + custom + obstacle,
      items: 10,
      speed,
      direction: "forward",
      classification: classification,
      obstacle,
      basket: basketCustum(),
      item: itemCustum(),
      subject: subjectCustom(),
    };
    setConfig(levelConfig);
    setLevel(levelConfig.level);
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

  const subjectCustom = useCallback(() => {
    if (custom === Custom.COLOR_2) {
      if (obstacle)
        return "같은 색깔의 물건을 캐리어에 담아주세요\n다른 색깔의 물건은 피해주세요.";
      return "컨베이어 벨트에서 파란색, 노란색 물건이 내려옵니다.\n같은 색깔의 물건을 캐리어에 담아주세요\n";
    } else if (custom === Custom.TYPE_2) {
      if (obstacle)
        return "옷은 캐리어에, 음식은 바구니에 담아주세요.\n장난감은 피해주세요.";
      return "컨베이어 벨트에서 옷과 음식이 내려옵니다.\n옷은 캐리어에, 음식은 바구니에 담아주세요.";
    } else if (custom === Custom.COLOR_3) {
      if (obstacle)
        return "같은 색깔의 물건을 캐리어에 담아주세요\n다른 색깔의 물건은 피해주세요.";
      return "컨베이어 벨트에서 물건이 내려옵니다.\n같은 색깔의 물건을 캐리어에 담아주세요\n";
    } else if (custom === Custom.TYPE_3) {
      if (obstacle)
        return "옷은 캐리어에, 음식은 바구니에, 악세서리는 가방에 담아주세요.\n장난감은 피해주세요.";
      return "컨베이어 벨트에서 3가지 종류의 물건이 내려옵니다.\n옷은 캐리어에, 음식은 바구니에, 악세서리는 가방에 담아주세요.";
    }
    return "";
  }, [custom, obstacle]);

  return {
    setSpeed,
    setClassification,
    setClassificationCriteria,
    setObstacle,
    level,
  };
}
