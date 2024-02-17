import React, { MouseEvent, useEffect, useState } from "react";
import { gameScore, gameStatus } from "@/atoms/souvenir/game";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Gold } from "./RankModal";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export default function GameEndModal() {
  if (typeof window === "undefined") return <div />;
  const [modal, setModal] = useState(true);
  const [score, setScore] = useRecoilState(gameScore);
  const setGameState = useSetRecoilState(gameStatus);
  const scoredString = localStorage.getItem("scored");
  const scored = scoredString ? JSON.parse(scoredString) : [];

  useEffect(() => {
    scored.push(score);

    scored.sort((a: number, b: number) => b - a);

    if (scored.length > 3) {
      scored.pop();
    }

    localStorage.setItem("scored", JSON.stringify(scored));
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const handleRestart = () => {
    setGameState(true);
    setModal(false);
    setScore(0);
  };

  if (!modal) {
    return null;
  }

  return (
    <div
      className="bg-black/20 w-full h-full min-h-[700px] fixed z-20"
      onClick={closeModal}
    >
      <div className="flex absolute flex-col items-center justify-center w-full h-full">
        <div
          className="flex flex-col w-[250px] h-[200px] mb-[400px] bg-gray-50 rounded-xl shadow-xl items-center justify-center"
          onClick={(e: MouseEvent) => e.stopPropagation()}
        >
          <span className="outline-title text-lg">최종 점수</span>
          <span className="outline-title text-3xl">{score} 점</span>
          <div className="flex flex-row mt-2">
            <Gold />
            <span className="outline-title text-lg ml-1">{scored[0]}</span>
          </div>
          <div className="flex flex-row h-[60px] items-end justify-between">
            <Button text="다시하기" onClick={handleRestart} />
            <Button text="닫기" onClick={() => setModal(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-white hover:bg-slate-50 w-20 h-10 rounded-lg shadow-md mx-3"
      onClick={onClick}
    >
      <span className="text-sm font-bold text-gray-500">{text}</span>
    </button>
  );
};
