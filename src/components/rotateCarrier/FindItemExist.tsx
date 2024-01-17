import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DrawFindItem } from "./index";

interface answerItem {
  isAnswer: boolean;
  scored: boolean;
}

export default function FindItemExist() {
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const setGameState = useSetRecoilState(RotateCarrierGameState);
  const setSubject = useSetRecoilState(SubjectTextState);
  const [answerItem, setAnswerItem] = useState<answerItem[]>([]);
  const path = "/assets/rotateCarrier";

  const isAnswer = (itemName: string) =>
    config.questions.some((question) => itemName === question.imageKey);

  useEffect(() => {
    setSubject("여기에는 어떤 물건이 들어 있었나요?");

    const answerItems: answerItem[] = config.itemExamples.map((item, index) => {
      return {
        isAnswer: isAnswer(item),
        scored: false,
      };
    });
    setAnswerItem(answerItems);
  }, []);

  const handleAnswer = (index: number) => {
    if (answerItem[index].isAnswer && !answerItem[index].scored) {
      setAnswerItem((prev) => {
        return prev.map((item, i) => {
          if (i === index) {
            return { ...item, scored: true };
          }
          return item;
        });
      });
      setGameState((prev) => {
        return { ...prev, existScore: prev.existScore + 1 };
      });
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-10 p-5 sm:p-10">
      {config.itemExamples.map((item, index) => {
        return (
          answerItem[index] && (
            <DrawFindItem
              image={`${path}/${item}.png`}
              index={index}
              isAnswer={answerItem[index].isAnswer}
              handleAnswer={handleAnswer}
              key={index}
            />
          )
        );
      })}
    </div>
  );
}
