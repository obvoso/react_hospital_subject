import {
  BaggageGameConfigState,
  CurrentItemIndex,
  BaggageGameState,
  BaggageScore,
} from "@/atoms/baggage/game";
import { BaggageCanvas } from "@/components/baggage";
import CurrentScore from "@/components/baggage/CurrentScore";
import GameControlButtons from "@/components/baggage/GameControlButtons";
import { DropDownButton } from "@/components/customBaggage/DropDownButton";
import {
  BaggageItemAssets,
  BaggageLevelConfig,
  BaggageSpeed,
  baggageGameLevels,
} from "@/utils/baggage/baggageGameConfig";
import { Timer } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";

const enum Classification {
  COLOR = 1,
  TYPE = 2,
}
const enum Custom {
  COLOR_2 = 1,
  COLOR_3 = 2,
  TYPE_2 = 3,
  TYPE_3 = 4,
}

export default function CustomGamePage() {
  const setConfig = useSetRecoilState(BaggageGameConfigState);
  const resetCurrentItemState = useResetRecoilState(CurrentItemIndex);
  const resetGameState = useResetRecoilState(BaggageGameState);
  const resetCurrentItemIndex = useResetRecoilState(CurrentItemIndex);
  const resetConfig = useResetRecoilState(BaggageGameConfigState);
  const resetScore = useResetRecoilState(BaggageScore);
  const [nextBtn, setNextBtn] = useState(false);
  const [level, setLevel] = useState(12);

  const [speed, setSpeed] = useState(BaggageSpeed.SLOW);
  const [classification, setClassification] = useState(2);
  const [classificationCriteria, setClassificationCriteria] = useState(
    Classification.COLOR
  );
  const [obstacle, setObstacle] = useState(0);
  const [custom, setCustom] = useState(Custom.COLOR_2);

  const speedOptions = [
    { label: "느림", value: BaggageSpeed.SLOW },
    { label: "보통", value: BaggageSpeed.MEDIUM },
    { label: "빠름", value: BaggageSpeed.FAST },
  ];

  const classificationOptions = [
    { label: "2개", value: 2 },
    { label: "3개", value: 3 },
  ];

  const classificationCriteriaOptions = [
    { label: "색상", value: "color" },
    { label: "종류", value: "type" },
  ];

  const obstacleOptions = [
    { label: "없음", value: 0 },
    { label: "있음", value: 1 },
  ];

  const reset = () => {
    resetGameState(); // 상태 리셋
    resetCurrentItemIndex(); // 현재 아이템 인덱스 리셋
    setNextBtn(false);
    resetCurrentItemState();
    resetScore();
  };

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

  useEffect(() => {
    setCustom(clasificationCustom());
  }, [classification, classificationCriteria]);

  useEffect(() => {
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
      item
        .slice(4, 2)
        .push(
          { imageKey: "item_green1", x: 0, y: 0 },
          { imageKey: "item_red1", x: 0, y: 0 }
        );
    } else if (obstacle === 1 && custom === Custom.TYPE_2) {
      item
        .slice(4, 2)
        .push(
          { imageKey: "item_toy1", x: 0, y: 0 },
          { imageKey: "item_toy2", x: 0, y: 0 }
        );
    } else if (obstacle === 1 && custom === Custom.COLOR_3) {
      item
        .slice(6, 2)
        .push(
          { imageKey: "item_clothes1", x: 0, y: 0 },
          { imageKey: "item_clothes4", x: 0, y: 0 }
        );
    } else if (obstacle === 1 && custom === Custom.TYPE_3) {
      item
        .slice(3, 2)
        .push(
          { imageKey: "item_toy2", x: 0, y: 0 },
          { imageKey: "item_toy3", x: 0, y: 0 }
        );
    }

    const levelConfig: BaggageLevelConfig = {
      level: 11 + speed + classification + obstacle,
      items: 10,
      speed,
      direction: "forward",
      classification: classification,
      obstacle,
      basket,
      item,
      subject: "와랄랄",
    };
    setConfig(levelConfig);
    setLevel(levelConfig.level);
    return () => {
      reset();
      resetConfig();
    };
  }, [speed, obstacle, custom]);

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between min-w-[500px] mx-auto px-4 py-5">
      <div className="flex flex-col items-center sm:items-start">
        <BaggageCanvas level={level} key={level} />
        <div className="flex flex-col items-center text-center mx-auto mt-4">
          <CurrentScore />
          <Timer />
          <GameControlButtons
            reset={reset}
            level={level}
            nextBtn={nextBtn}
            setNextBtn={setNextBtn}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between h-fit md:ml-16 sm:ml-10 sm:mt-20 mb-10">
        <div className="z-10">
          <DropDownButton
            label="속도"
            options={speedOptions}
            onChange={(speed: BaggageSpeed) => setSpeed(speed)}
          />
          <DropDownButton
            label="분류 수"
            options={classificationOptions}
            onChange={(classification: number) =>
              setClassification(classification)
            }
          />
          <DropDownButton
            label="분류 기준"
            options={classificationCriteriaOptions}
            onChange={(classificationCriteria: Classification) =>
              setClassificationCriteria(classificationCriteria)
            }
          />
          <DropDownButton
            label="방해 요소"
            options={obstacleOptions}
            onChange={(obstacle: number) => setObstacle(obstacle)}
          />
        </div>
      </div>
    </div>
    //</div>
  );
}
