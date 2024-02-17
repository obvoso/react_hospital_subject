import { gameScore } from "@/atoms/souvenir/game";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Gold } from "./RankModal";

export default function Score() {
  const score = useRecoilValue(gameScore);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const scoredString = localStorage.getItem("scored");
    const scored = scoredString ? JSON.parse(scoredString) : [];
    setHighScore(scored[0] ? scored[0] : 0);
  }, []);

  return (
    <div className="flex flex-col bg-bubble bg-cover w-[110px] h-[110px] items-center justify-center">
      <span className="text-center items-center outline-title text-3xl font-black">
        {score}
      </span>
      <div className="flex flex-row items-center">
        <div className="scale-75">
          <Gold />
        </div>
        <span className="text-center items-center outline-title text-lg">
          {highScore}
        </span>
      </div>
    </div>
  );
}
