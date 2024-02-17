import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { gameStatus } from "@/atoms/souvenir/game";
import SouvenirGame from "@/components/souvenir";
import GameEndModal from "@/components/souvenir/GameEndModal";
import ItemQueue from "@/components/souvenir/ItemQueue";
import Score from "@/components/souvenir/Score";
import { Timer } from "@/components/souvenir/Timer";

const GamePage = () => {
  const gameState = useRecoilValue(gameStatus);
  const [key, setKey] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (gameState === true) setKey((prev) => prev + 1);
  }, [gameState]);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        setScale(0.8);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <div className="flex h-screen justify-center items-center min-w-max bg-[#FFF2CC]">
      {gameState === false && <GameEndModal />}
      <div
        className="flex flex-col items-center h-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top", // 스케일링의 기준점을 중앙으로 설정
        }}
      >
        <ItemQueue />
        <Timer />
        <div className="flex-none">
          <Score />
        </div>
        <SouvenirGame key={key} />
      </div>
    </div>
  );
};

export default GamePage;
