import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DrawFindItem } from "./DrawFindItem";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";

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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalImages = 4; // 총 이미지 개수

  const handleImageLoaded = () => {
    setLoadedCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (loadedCount === totalImages) {
      setImagesLoaded(true);
    }
  }, [loadedCount, totalImages]);

  const isAnwer = (index: number) => index === gameState.lastDirection;

  const findAnswerItem = (idx: number) => {
    const answerItems: answerItem[] = config.dirrectionExamples[idx].items.map(
      (item) => {
        return {
          isAnswer: isAnwer(item.index),
          scored: false,
        };
      }
    );
    setAnswerItem(answerItems);
  };

  useEffect(() => {
    findAnswerItem(currentGroupIndex);
  }, [currentGroupIndex]);

  useEffect(() => {
    setSubject("물건 모양은 어떻게 되어 있을까요?");
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
          ...prev,
          directionScore: prev.directionScore + 1,
        };
      });
      if (currentGroupIndex < config.dirrectionExamples.length - 1) {
        setCurrentGroupIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-10 p-10">
      {config.dirrectionExamples[currentGroupIndex].items.map((item, index) => {
        return (
          answerItem[index] && (
            <DrawFindItem
              image={`${path}/${item.imageKey}.png`}
              index={index}
              isAnswer={answerItem[index].isAnswer}
              key={index}
              handleAnswer={handleAnswer}
              onImageLoaded={handleImageLoaded}
              showImage={imagesLoaded}
            />
          )
        );
      })}
    </div>
  );
}
