import { useEffect, useRef, useState } from "react";
import { Mark } from "@/type/route/Mark";
import { RouteGameConfig } from "@/type/route/routeGameConfigType";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { useRecoilValue } from "recoil";
import { routeGameState, vehicleSpeedState } from "@/atoms/route/game";
import { customRouteState } from "@/atoms/route/custom";

interface Props {
  level: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  marks: Mark[];
  subjectInitFlag: boolean;
  vehicleAsset: string;
}

export function useAnimate({
  level,
  canvasRef,
  marks,
  subjectInitFlag,
  vehicleAsset,
}: Props) {
  const animationFrameIdRef = useRef<number | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const speed = useRecoilValue(vehicleSpeedState);
  const customRoute = useRecoilValue(customRouteState);
  const gameState = useRecoilValue(routeGameState);

  const startAnimation = (
    context: CanvasRenderingContext2D,
    vehicle: HTMLImageElement,
    config: RouteGameConfig,
    marks: Mark[]
  ) => {
    let currentMark = 0;
    const increaseSpeed = speed;

    const animate = () => {
      //종료 조건
      if (currentMark + 1 >= config.mark + config.transit) {
        cancelAnimationFrame(animationFrameIdRef.current!);
        animationFrameIdRef.current = null;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        setAnimationDone(true);
        return;
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
          //맨 처음 시작하는 경우 0.5초뒤에 시작
          if (speed === increaseSpeed && currentMark === 0)
            setTimeout(
              () => (animationFrameIdRef.current = requestAnimationFrame(move)),
              500
            );
          else animationFrameIdRef.current = requestAnimationFrame(move);
        } else {
          if (animationFrameIdRef.current)
            cancelAnimationFrame(animationFrameIdRef.current);
          currentMark++;
          const timer = setTimeout(() => {
            animationFrameIdRef.current = requestAnimationFrame(animate);
          }, 300);
          return () => {
            clearTimeout(timer);
          };
        }
      };

      move();
    };
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (
      gameState.start &&
      canvasRef.current &&
      subjectInitFlag &&
      marks.length &&
      !animationFrameIdRef.current &&
      !animationDone
    ) {
      const config = level < 13 ? routeGameConfigList[level] : customRoute;
      const vehicle = new Image();
      const context = canvasRef.current.getContext("2d");
      if (!context) return;
      vehicle.src = `/assets/route/${vehicleAsset}.png`;
      vehicle.onload = () => {
        if (!animationFrameIdRef.current)
          startAnimation(context, vehicle, config, marks);
        else {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      };
    }
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [
    marks,
    subjectInitFlag,
    vehicleAsset,
    animationDone,
    speed,
    level,
    gameState.start,
  ]);

  return { animationDone, setAnimationDone };
}
