import { RotateCarrierGameState } from "@/atoms/rotateCarrier/config";
import { RotateCarrierLevelConfig } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { RefObject, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  drawRect,
  drawStaticElements,
} from "@/components/rotateCarrier/utils/DrawUtils";
import { getRandomRotateDirection } from "@/components/rotateCarrier/utils/randomDirection";

interface params {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  images: RefObject<{ [key: string]: HTMLImageElement }>;
  config: RotateCarrierLevelConfig;
  clickedRectIndex: number;
}

export const useAnimation = ({
  canvasRef,
  context,
  images,
  config,
  clickedRectIndex,
}: params) => {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);

  const draw = (angle: number) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.rotate(angle);
    if (!images.current) return;
    context.drawImage(
      images.current["carrier"],
      -images.current["carrier"].width / 2,
      -images.current["carrier"].height / 2,
      config.item[0].point.w,
      config.item[0].point.h
    );

    config.space.forEach((rect, index) => {
      const color = clickedRectIndex === index ? "#6CB4EE" : "white";
      drawRect(context, rect.x, rect.y, rect.w, rect.h, color);
    });

    context.restore();
  };

  const animateRotation = () => {
    let rotateDirection = getRandomRotateDirection();
    let degree = 0; //증가량은 속도
    let rotateCount = 0;
    let angle = 0;
    let endAngle =
      rotateDirection === "right"
        ? config.rotationAngle[0]
        : -config.rotationAngle[0];

    const initNextRotate = () => {
      rotateCount++;
      rotateDirection = getRandomRotateDirection();
      const rotateAngle = config.rotationAngle[rotateCount];
      rotateDirection === "right"
        ? (endAngle += rotateAngle)
        : (endAngle -= rotateAngle);
    };

    const animateStep = () => {
      if (rotateCount === config.rotation) {
        setGameState((prev) => {
          return {
            ...prev,
            lastAngle: angle,
          };
        });
        return;
      }
      switch (rotateDirection) {
        case "right":
          degree = Number(degree.toFixed(3)) + 0.015;
          if (degree >= endAngle) initNextRotate();
          break;
        case "left":
          degree = Number(degree.toFixed(3)) - 0.015;
          if (degree <= endAngle) initNextRotate();
          break;
      }
      angle = degree * Number((Math.PI / 2).toFixed(3));
      draw(angle);
      requestAnimationFrame(animateStep);
    };
    requestAnimationFrame(animateStep);
  };

  const animateQuestion = (context: CanvasRenderingContext2D) => {
    let duration = 0;
    const flash = () => {
      const progress = Math.min(duration, 1);
      const alpha = Math.sin(progress * Math.PI);
      const question = config.item.slice(1, config.findItems + 1);
      duration += 0.015;
      drawStaticElements(context, question, images, config, alpha);

      if (progress < 1) {
        requestAnimationFrame(flash);
      }
    };

    requestAnimationFrame(flash);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (gameState.start) {
      animateQuestion(context); // start 누르고 1초동안 문제 보여주기
      setTimeout(animateRotation, 1000); // start 누르고 1초 후 애니메이션 시작
    }
  }, [gameState.start]);

  // 클릭시 클릭한 rect에 색칠
  useEffect(() => {
    if (!gameState.start) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    draw(gameState.lastAngle);
  }, [clickedRectIndex, gameState.start, images, gameState.lastAngle]);
};
