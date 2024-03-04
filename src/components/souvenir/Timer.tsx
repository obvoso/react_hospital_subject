import { useState, useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { gameStatus } from "@/atoms/souvenir/game";

export const Timer = () => {
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");
  const [gameState, setGameState] = useRecoilState(gameStatus);
  const [stop, setStop] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (stop) return;
    timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime + INTERVAL);
    }, INTERVAL);

    // if (timeLeft === 1000 * 5) {
    if (timeLeft === 1000 * 60 * 5) {
      clearInterval(timer);
      setGameState(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, stop]);

  useEffect(() => {
    if (gameState) {
      setTimeLeft(0);
      setStop(false);
    } else {
      //setTimeLeft(0);
      setStop(true);
      clearInterval(timer);
    }
  }, [gameState]);

  return (
    <div className="flex absolute w-[100px] mt-7 ml-72 justify-center items-center">
      <Image
        src="/assets/souvenir/bubble.png"
        alt="시계"
        width={100}
        height={50}
        style={{ width: 100, height: 50 }}
        className="absolute w-[100px] h-[50px] bg-cover"
      />
      {/*<span className="flex mt-3 ml-5 text-xl text-bold outline-title">*/}
      <span className="flex justify-center items-center text-lg text-semibold outline-title">
        {minutes} : {second}
      </span>
    </div>
  );
};
