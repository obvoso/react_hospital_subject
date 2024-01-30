import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { baggageGameLevels } from "@/assets/baggage/baggageGameConfig";
import { BaggageCanvas } from "@/components/baggage";
import {
  BaggageGameConfigState,
  BaggageGameState,
  BaggageScore,
  CurrentItemIndex,
} from "@/atoms/baggage/game";
import LevelNav from "@/utils/LevelNav";
import GameControlButtons from "@/components/baggage/GameControlButtons";
import Timer from "@/components/baggage/Timer";
import CurrentScore from "@/components/baggage/CurrentScore";
import SpeedButton from "@/components/baggage/SpeedButton";

export default function GamePage() {
  const router = useRouter();
  const level = Number(router.query.level);
  const setConfig = useSetRecoilState(BaggageGameConfigState);
  const resetCurrentItemState = useResetRecoilState(CurrentItemIndex);
  const resetGameState = useResetRecoilState(BaggageGameState);
  const resetCurrentItemIndex = useResetRecoilState(CurrentItemIndex);
  const resetConfig = useResetRecoilState(BaggageGameConfigState);
  const resetScore = useResetRecoilState(BaggageScore);
  const [nextBtn, setNextBtn] = useState(false);

  const reset = () => {
    resetGameState(); // 상태 리셋
    resetCurrentItemIndex(); // 현재 아이템 인덱스 리셋
    setNextBtn(false);
    resetCurrentItemState();
    resetScore();
  };

  // 레벨 설정
  useEffect(() => {
    if (!router.isReady) return;
    if (level > 11 || isNaN(level)) {
      router.push("/404");
      return;
    }
    const levelConfig = baggageGameLevels[level];
    setConfig(levelConfig);

    return () => {
      reset();
      resetConfig();
    };
  }, [router.isReady, level]);

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between min-w-[500px] mx-auto p-4">
      <div className="flex flex-col items-center sm:items-start">
        <BaggageCanvas level={level} key={level} />
      </div>
      <div className="flex sm:flex-col flex-col-reverse bg-gray-100 rounded-2xl shadow-md p-4 sm:w-[325px] items-center justify-between h-fit md:ml-16 sm:ml-10 sm:mt-20 mb-2">
        <div className="w-full p-2 flex items-center justify-center sm:justify-start">
          <GameControlButtons
            reset={reset}
            level={level}
            nextBtn={nextBtn}
            setNextBtn={setNextBtn}
          />
        </div>
        <div className="flex relative flex-col sm:flex-row items-center w-full p-1">
          <LevelNav game="baggage" curLevel={level} />
          <div className="flex flex-row sm:ml-5 mt-2 sm:mt-0 w-[60%] justify-between">
            <SpeedButton />
            <div className="bg-white rounded-2xl shadow-lg sm:absolute gap-1 flex sm:mt-[11.2rem] w-40 h-20 flex-col items-center justify-center text-center">
              <CurrentScore />
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
