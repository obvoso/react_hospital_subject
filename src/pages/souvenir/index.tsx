import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { gameStatus } from "@/atoms/souvenir/game";
import SouvenirGame from "@/components/souvenir";
import GameEndModal from "@/components/souvenir/GameEndModal";
import ItemQueue from "@/components/souvenir/ItemQueue";
import Score from "@/components/souvenir/Score";
import { Timer } from "@/components/souvenir/Timer";
import RankButton from "@/components/souvenir/RankButton";
import Head from "next/head";

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
    <>
      {/*<Head>
        <link rel="preload" href="/assets/souvenir/bubble.png" as="image" />
        <link rel="preload" href="/assets/souvenir/queue.png" as="image" />
        <link rel="preload" href="/assets/souvenir/item/item0.png" as="image" />
        <link rel="preload" href="/assets/souvenir/item/item1.png" as="image" />
        <link rel="preload" href="/assets/souvenir/item/item2.png" as="image" />
        <link rel="preload" href="/assets/souvenir/item/item3.png" as="image" />
        <link rel="preload" href="/assets/souvenir/item/item4.png" as="image" />
        <link rel="preload" href="/assets/souvenir/item/item5.png" as="image" />
        <link rel="preload" href="/assets/souvenir/item/item6.png" as="image" />
      </Head>*/}
      <div className="flex h-screen justify-center min-w-max bg-[#FFF2CC]">
        {gameState === false && <GameEndModal />}
        <div
          className="flex flex-col items-center h-fit"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center top",
          }}
        >
          <ItemQueue />
          <Timer />
          <RankButton />
          <div className="flex-none">
            <Score />
          </div>
          <SouvenirGame key={key} />
        </div>
      </div>
    </>
  );
};

export default GamePage;
