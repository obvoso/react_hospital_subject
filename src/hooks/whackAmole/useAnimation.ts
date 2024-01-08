import { whackAmoleConfigState } from "@/atoms/whackAmole/config";
import { whackAmoleGameState } from "@/atoms/whackAmole/game";
import { FunctionsOutlined } from "@mui/icons-material";
import { useState, useEffect, RefObject, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface UseAnimationProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  images: RefObject<{ [key: string]: HTMLImageElement }>;
}

export const useAnimation = ({
  canvasRef,
  images,
  context,
}: UseAnimationProps) => {
  const config = useRecoilValue(whackAmoleConfigState);
  const [hammerPosition, setHammerPosition] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const hammerRef = useRef(hammerPosition);
  const [gameState, setGameState] = useRecoilState(whackAmoleGameState);
  const appearY = 200; // 두더지 나타날 때
  const disappearY = 100; // 두더지가 사라질 때의 y 위치

  let moles = config.moles.map((mole) => ({
    ...mole,
    position: { ...mole.position, y: 200 }, // 시작 y 위치 설정
    isVisible: true, // 초기에는 모든 두더지가 보이게 설정
    lastUpdated: performance.now(), // 현재 시간으로 초기화
  }));

  function gameStart() {
    if (!context || !canvasRef.current || !images.current) return;

    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
  }

  function update() {
    const currentTime = performance.now();
    moles = moles.map((mole) => {
      // 두더지가 보이는 상태와 현재 시간을 기반으로 표시 여부 결정
      const isVisible =
        currentTime - mole.lastUpdated > config.speed[1]
          ? !mole.isVisible
          : mole.isVisible;

      let newY = mole.position.y;
      if (isVisible && newY > disappearY) {
        newY -= 10; // 올라오는 속도 조절
      } else if (!isVisible && newY < appearY) {
        newY += 10; // 내려가는 속도 조절
      }

      return {
        ...mole,
        isVisible,
        position: {
          ...mole.position,
          y: newY,
        },
        lastUpdated:
          isVisible !== mole.isVisible ? currentTime : mole.lastUpdated,
      };
    });
  }

  function draw() {
    if (!canvasRef.current || !images.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    moles.forEach((mole) => {
      if (images.current) {
        context.drawImage(
          images.current[mole.asset],
          mole.position.x,
          mole.position.y,
          120,
          100
        );
        if (mole.position.y < 200) {
          context.drawImage(
            images.current["border"],
            mole.position.x + 15,
            mole.position.y - 90,
            90,
            90
          );
          context.drawImage(
            images.current[config.findItems[mole.id].asset],
            mole.position.x + 25,
            mole.position.y - 80,
            70,
            70
          );
        }
        if (hammerRef.current.visible && images.current["hit"]) {
          context.drawImage(
            images.current["hit"],
            hammerRef.current.x,
            hammerRef.current.y,
            70,
            70
          );
        }
      }
    });
  }

  useEffect(() => {
    if (gameState.start) {
      gameStart();
    }
  }, [gameState.start]);

  useEffect(() => {
    hammerRef.current = hammerPosition;
  }, [hammerPosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setHammerPosition({ x, y, visible: true });
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
  }, [canvasRef]);
};
