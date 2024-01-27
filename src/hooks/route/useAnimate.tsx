import { useEffect, useRef, useState } from "react";
import { Mark } from "@/type/route/Mark";
import { RouteGameConfig } from "@/type/route/routeGameConfigType";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { clear } from "console";

interface Props {
  level: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  marks: Mark[];
  subjectInitFlag: boolean;
  vehicleAsset: string;
  animationStop: boolean;
}

export function useAnimate({
  level,
  canvasRef,
  marks,
  subjectInitFlag,
  vehicleAsset,
  animationStop,
}: Props) {
  const animationFrameIdRef = useRef<number | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const startAnimation = (
    context: CanvasRenderingContext2D,
    vehicle: HTMLImageElement,
    config: RouteGameConfig,
    marks: Mark[]
  ) => {
    let currentMark = 0;
    const increaseSpeed = config.speed;

    const animate = () => {
      //종료 조건
      if (currentMark + 1 >= config.mark + config.transit) {
        cancelAnimationFrame(animationFrameIdRef.current!);
        animationFrameIdRef.current = null;
        const timer = setTimeout(() => {
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          setAnimationDone(true);
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
      canvasRef.current &&
      subjectInitFlag &&
      marks.length &&
      !animationFrameIdRef.current &&
      !animationStop
    ) {
      const config = routeGameConfigList[level];
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
      setAnimationDone(false);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [marks, subjectInitFlag, vehicleAsset, animationStop]);

  return { animationDone };
}
