import { RouteGameConfigList } from "@/assets/route/routeGameConfig";
import { routeGameState } from "@/atoms/route/game";
import { Mark } from "@/type/route/Mark";
import { RouteGameConfig } from "@/type/route/routeGameConfig";
import { useEffect } from "react";
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
    config: RouteGameConfig,
    marks: Mark[]
  ) => {
    let currentMark = 0;
    const increaseSpeed = config.speed;

    const animate = () => {
      if (currentMark + 1 >= config.mark + config.transit) {
        const timer = setTimeout(() => {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }, 200);
        return () => clearTimeout(timer);
      }

      const { x: startX, y: startY } = marks[currentMark];
      const { x: endX, y: endY } = marks[currentMark + 1];

      const totalDistance = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );
      let speed = 0;

      const move = () => {
        speed += increaseSpeed;
        const distanceFraction = Math.min(speed / totalDistance, 1);

        const x = startX + (endX - startX) * distanceFraction;
        const y = startY + (endY - startY) * distanceFraction;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(vehicle, x, y, 50, 50);

        if (distanceFraction < 1) {
          requestAnimationFrame(move);
        } else {
          currentMark++;
          requestAnimationFrame(animate);
        }
      };

      move();
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
      startAnimation(context, vehicle, config, marks);
    };
  }, [canvasRef, gameState.start, marks]);
}
