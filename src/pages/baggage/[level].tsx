import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { baggageGameLevels } from "@/utils/baggage/baggageGameConfig";
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
    const levelConfig = baggageGameLevels[level];
    setConfig(levelConfig);

    return () => {
      reset();
      resetConfig();
    };
  }, [router.isReady, level]);

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between min-w-[500px] mx-auto px-4 py-5">
      <div className="flex flex-col items-center sm:items-start">
        <BaggageCanvas level={level} key={level} />
        <div className="flex flex-col items-center text-center mx-auto mt-4">
          <CurrentScore />
          <Timer />
          <GameControlButtons
            reset={reset}
            level={level}
            nextBtn={nextBtn}
            setNextBtn={setNextBtn}
          />
        </div>
      </div>
      <div className="flex items-center justify-center h-fit md:ml-32 sm:ml-10 sm:mt-20 mb-10">
        <LevelNav game="baggage" />
      </div>
    </div>
  );
}
