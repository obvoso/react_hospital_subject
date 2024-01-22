import { RouteGameConfigList } from "@/assets/route/routeGameConfig";
import { routeGameState } from "@/atoms/route/game";
import { Mark } from "@/type/route/Mark";
import { RouteGameConfig } from "@/type/route/routeGameConfig";
import { use, useEffect } from "react";
import { useRecoilValue } from "recoil";

interface Props {
  level: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  marks: Mark[];
}

export function useAnimate({ level, canvasRef, marks }: Props) {
  const gameState = useRecoilValue(routeGameState);

  const startAnimation = (
    context: CanvasRenderingContext2D,
    vehicle: HTMLImageElement,
    config: RouteGameConfig
  ) => {
    let currentMark = 0;
    let speed = 0;
    let increaseSpeed = 0.015;

    const animate = () => {
      speed += increaseSpeed;
      if (speed > config.speed / 1000) {
        speed = 0;
        currentMark++;
      }

      if (currentMark + 1 === config.mark) {
        const timer = setTimeout(() => {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }, 200);
        return () => clearTimeout(timer);
      }

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      const { x: startX, y: startY } = marks[currentMark];
      const { x: endX, y: endY } = marks[currentMark + 1];
      const x = startX + (endX - startX) * speed;
      const y = startY + (endY - startY) * speed;

      context.drawImage(vehicle, x, y, 50, 50);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!gameState.start) return;
    const config = RouteGameConfigList[level];
    const vehicle = new Image();
    if (!canvasRef?.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    config.obstacle
      ? (vehicle.src = "/assets/route/taxi.png")
      : (vehicle.src = "/assets/route/bus.png");

    vehicle.onload = () => {
      startAnimation(context, vehicle, config);
    };
  }, [canvasRef, gameState.start]);
}
