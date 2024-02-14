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

  useEffect(() => {
    if (gameState === true) setKey((prev) => prev + 1);
  }, [gameState]);

  return (
    <div className="flex h-screen justify-center items-center min-w-500px bg-[#FFF2CC]">
      <div className="flex relative flex-col items-center h-full">
        {gameState === false && <GameEndModal />}
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
