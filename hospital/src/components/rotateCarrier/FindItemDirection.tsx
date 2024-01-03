import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DrawFindItem } from "./DrawFindItem";

interface answerItem {
  isAnswer: boolean;
  scored: boolean;
}

export default function FindItemDirection() {
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const setSubject = useSetRecoilState(SubjectTextState);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [answerItem, setAnswerItem] = useState<answerItem[]>([]);
  const path = "/assets/rotateCarrier";

  const isAnwer = (index: number) => index === gameState.lastDirection;

  useEffect(() => {
    setSubject("물건 모양은 어떻게 되어 있을까요?");
    const answerItems: answerItem[] = config.dirrectionExamples[
      currentGroupIndex
    ].items.map((item, index) => {
      return {
        isAnswer: isAnwer(index),
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
        return {
          ...gameState,
          directionScore: prev.directionScore + 1,
        };
      });
      if (currentGroupIndex < config.dirrectionExamples.length - 1) {
        setCurrentGroupIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-10 p-20">
      {config.dirrectionExamples[currentGroupIndex].items.map((item, index) => {
        return (
          <DrawFindItem
            image={`${path}/${item}.png`}
            index={index}
            isAnswer={answerItem[index]?.isAnswer}
            key={index}
            handleAnswer={handleAnswer}
          />
        );
      })}
    </div>
  );
}
