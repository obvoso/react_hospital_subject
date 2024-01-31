import React, { useEffect, useState } from "react";
import {
  CurrentItemIndex,
  BaggageGameState,
  BaggageScore,
} from "@/atoms/baggage/game";
import { BaggageCanvas } from "@/components/baggage";
import CurrentScore from "@/components/baggage/CurrentScore";
import GameControlButtons from "@/components/baggage/GameControlButtons";
import { DropDownButton } from "@/components/customBaggage/DropDownButton";
import { useCustom } from "@/hooks/baggage/useCustom";
import { BaggageSpeed } from "@/assets/baggage/baggageGameConfig";
import { useResetRecoilState } from "recoil";
import Timer from "@/components/baggage/Timer";
import { Classification } from "@/atoms/baggage/custom";
import SpeedButton from "@/components/baggage/SpeedButton";

export default function CustomGamePage() {
  const resetCurrentItemState = useResetRecoilState(CurrentItemIndex);
  const resetGameState = useResetRecoilState(BaggageGameState);
  const resetCurrentItemIndex = useResetRecoilState(CurrentItemIndex);
  const resetScore = useResetRecoilState(BaggageScore);
  const [nextBtn, setNextBtn] = useState(false);
  const {
    setSpeed,
    setClassification,
    setClassificationCriteria,
    setObstacle,
    level,
  } = useCustom();

  const reset = () => {
    resetGameState(); // 상태 리셋
    resetCurrentItemIndex(); // 현재 아이템 인덱스 리셋
    setNextBtn(false);
    resetCurrentItemState();
    resetScore();
  };

  const speedOptions = [
    { label: "매우 느림", value: BaggageSpeed.SPEED0 },
    { label: "느림", value: BaggageSpeed.SPEED1 },
    { label: "조금 느림", value: BaggageSpeed.SPEED2 },
    { label: "보통", value: BaggageSpeed.SPEED3 },
    { label: "조금 빠름", value: BaggageSpeed.SPEED4 },
    { label: "빠름", value: BaggageSpeed.SPEED5 },
  ];

  const classificationOptions = [
    { label: "2개", value: 2 },
    { label: "3개", value: 3 },
  ];

  const classificationCriteriaOptions = [
    { label: "색상", value: Classification.COLOR },
    { label: "종류", value: Classification.TYPE },
  ];

  const obstacleOptions = [
    { label: "없음", value: 0 },
    { label: "있음", value: 1 },
  ];

  if (level === 12) return null;
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between min-w-[500px] mx-auto px-4 py-5">
      <div className="flex flex-col items-center sm:items-start">
        <BaggageCanvas level={level} key={level} />
      </div>
      <div className="flex flex-col sm:w-[325px] items-center mx-auto justify-center h-fit md:ml-16 sm:ml-10 sm:mt-20 mb-10 mt-3">
        <div className="mb-5">
          <GameControlButtons
            reset={reset}
            level={level}
            nextBtn={nextBtn}
            setNextBtn={setNextBtn}
          />
        </div>
        <div className="z-10 flex items-center flex-row sm:flex-col">
          <DropDownButton
            label="속도"
            options={speedOptions}
            onChange={(speed: number) => setSpeed(speed)}
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
        <div className="flex flex-row sm:flex-col items-center text-center mx-auto mt-4 gap-2">
          <CurrentScore />
          <Timer />
        </div>
      </div>
    </div>
  );
}
