import { whackAmoleConfigState } from "@/atoms/whackAmole/config";
import { whackAmoleGameState } from "@/atoms/whackAmole/game";
import Canvas from "@/components/whackAmole/Canvas";
import CustomButton from "@/utils/CustomButton";
import shuffleArray from "@/utils/arrayShuffle";
import { whackAmoleGameConfig } from "@/utils/whackAmole/whackAmoleGameConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function GamePage() {
  const router = useRouter();
  const level = Number(router.query.level);
  const [gameState, setGameState] = useRecoilState(whackAmoleGameState);
  const [config, setConfig] = useRecoilState(whackAmoleConfigState);

  useEffect(() => {
    if (!router.isReady) return;
    const levelConfig = whackAmoleGameConfig[level];
    const shuffleItems = shuffleArray(levelConfig.findItems);
    setConfig({ ...levelConfig, findItems: shuffleItems });
  }, [router.isReady, level]);

  function handleStart() {
    setGameState({ ...gameState, start: true });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-[500px] bg-gray-100">
      <h1>GamePage</h1>
      <Canvas key={level} />
      <div className="flex justify-center space-x-4 mt-4">
        <CustomButton
          text="게임 시작"
          onClick={handleStart}
          type={gameState.start ? "disabled" : "activate"}
        />
      </div>
    </div>
  );
}
