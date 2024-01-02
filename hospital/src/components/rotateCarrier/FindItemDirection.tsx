import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DrawFindItem } from "./DrawFindItem";

export default function FindItemDirection() {
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const setSubject = useSetRecoilState(SubjectTextState);
  const [answerDirection, setAnswerDirection] = useState(0);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const path = "/assets/rotateCarrier";

  useEffect(() => {
    setSubject("물건 모양은 어떻게 되어 있을까요?");
    const answerDirection = gameState.lastDirection % 4;
    switch (answerDirection) {
      case 0:
      case -4:
        setAnswerDirection(0);
        break;
      case 2:
      case -2:
        setAnswerDirection(2);
        break;
      case 1:
      case -3:
        setAnswerDirection(1);
        break;
      case 3:
      case -1:
        setAnswerDirection(3);
        break;
    }
  }, []);

  const handleAnswer = (index: number) => {
    if (index === answerDirection) {
      setGameState((prev) => {
        return { ...gameState, directionScore: prev.directionScore + 1 };
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
            uniqueKey={index}
            key={index}
            handleAnswer={handleAnswer}
          />
        );
      })}
    </div>
  );
}
