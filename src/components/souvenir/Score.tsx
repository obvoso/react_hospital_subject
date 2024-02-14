import { gameScore } from "@/atoms/souvenir/gameScore";
import React from "react";
import { useRecoilValue } from "recoil";

export default function Score() {
  const score = useRecoilValue(gameScore);

  return (
    <div className="flex bg-bubble bg-cover w-[110px] h-[110px] items-center justify-center">
      <span className="text-center items-center outline-title text-3xl font-black">
        {score}
      </span>
    </div>
  );
}
