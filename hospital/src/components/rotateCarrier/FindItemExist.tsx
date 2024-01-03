import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DrawFindItem } from "./index";

export default function FindItemExist() {
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const setSubject = useSetRecoilState(SubjectTextState);
  const path = "/assets/rotateCarrier";

  useEffect(() => {
    setSubject("여기에는 어떤 물건이 들어 있었나요?");
  }, []);

  const handleAnswer = (itemName: string) => {
    const isAnswer = config.questions.some(
      (question) => itemName === question.imageKey
    );
    if (isAnswer) {
      setGameState((prev) => {
        return { ...gameState, itemScore: prev.itemScore + 1 };
      });
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-10 p-20">
      {config.itemExamples.map((item, index) => {
        return (
          <DrawFindItem
            image={`${path}/${item}.png`}
            index={index}
            uniqueKey={item}
            handleAnswer={handleAnswer}
            key={index}
          />
        );
      })}
    </div>
  );
}
