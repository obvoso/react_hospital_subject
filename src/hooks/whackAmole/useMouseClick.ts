import { whackAmoleConfigState } from "@/atoms/whackAmole/config";
import {
  whackAmoleGameState,
  whackAmoleMouseState,
} from "@/atoms/whackAmole/game";
import { RefObject, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useMouseClick = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [hammerPosition, setHammerPosition] =
    useRecoilState(whackAmoleMouseState);
  const [gameState, setGameState] = useRecoilState(whackAmoleGameState);
  const config = useRecoilValue(whackAmoleConfigState);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleScore = (x: number) => {
      const { moles, findItems, answerItems } = config;
      const { score } = gameState;

      const mole = moles.find(
        (mole) => mole.position.x - 50 < x && x < mole.position.x + 170
      );
      if (!mole) return;

      const item = answerItems.find(
        (answer) => answer === findItems[mole.id].asset
      );
      console.log(item);

      if (item) {
        setGameState({ ...gameState, score: score + 1 });
        console.log("맞춤");
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setHammerPosition({ x, y, visible: true });
      handleScore(x);
    };

    const handleMouseUp = () => {
      setHammerPosition((prev) => ({ ...prev, visible: false }));
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [canvasRef, config]);
};
