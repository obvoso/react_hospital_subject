import React, { useRef, useEffect, useState } from "react";
import { preLoadImages } from "./utils/preLoadImages";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
} from "@/atoms/rotateCarrier/config";
import { useRecoilState, useRecoilValue } from "recoil";
import { RotateCarrierItemAssets } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { useMouseEvent } from "@/hooks/rotateCarrier/useMouseEvent";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clickedRectIndex, setClickedRectIndex] = useState<number>(-1);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const config = useRecoilValue(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);

  useMouseEvent(canvasRef, config, setClickedRectIndex);

  const drawRect = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) => {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
    context.strokeRect(x, y, w, h);
  };

  const draw = (context: CanvasRenderingContext2D, angle: number) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.rotate(angle);
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

  const drawStaticElements = (
    context: CanvasRenderingContext2D,
    question: RotateCarrierItemAssets[],
    alpha: number
  ) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.drawImage(
      images.current["carrier"],
      -images.current["carrier"].width / 2,
      -images.current["carrier"].height / 2,
      config.item[0].point.w,
      config.item[0].point.h
    );
    config.space.forEach((rect) => {
      drawRect(context, rect.x, rect.y, rect.w, rect.h, "white");
    });

    question.forEach((item) => {
      context.save();

      // 네온 효과를 위한 설정
      context.shadowBlur = 20;
      context.shadowColor = "#6CB4EE";

      context.globalAlpha = alpha;

      // 이미지 그리기
      context.drawImage(
        images.current[item.imageKey],
        item.point.x,
        item.point.y,
        item.point.w,
        item.point.h
      );

      // 네온 효과
      context.fillStyle = "rgba(0, 0, 0, 0)";
      context.fillRect(
        item.point.x - context.shadowBlur,
        item.point.y - context.shadowBlur,
        item.point.w + context.shadowBlur * 2,
        item.point.h + context.shadowBlur * 2
      );

      context.restore();
    });
    context.restore();
  };

  const animateQuestion = (context: CanvasRenderingContext2D) => {
    let duration = 0;
    const flash = () => {
      const progress = Math.min(duration, 1);
      const alpha = Math.sin(progress * Math.PI);
      const question = config.item.slice(1, config.findItems + 1);
      duration += 0.015;
      drawStaticElements(context, question, alpha);

      if (progress < 1) {
        requestAnimationFrame(flash);
      }
    };

    requestAnimationFrame(flash);
  };

  const animate = (context: CanvasRenderingContext2D) => {
    let degree = 0;
    const animateStep = () => {
      const progress = Math.min(degree, 1);
      const angle = progress * (Math.PI / 2); // 90도
      degree += 0.015;
      draw(context, angle);

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      }
    };
    requestAnimationFrame(animateStep);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (gameState.start) {
      animateQuestion(context); // start 누르고 1초동안 문제 보여주기
      setTimeout(() => animate(context), 1000); // start 누르고 1초 후 애니메이션 시작
    }
  }, [gameState.start]);

  useEffect(() => {
    if (!gameState.start) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    draw(context, Math.PI / 2);
  }, [clickedRectIndex, gameState.start, images]);

  useEffect(() => {
    preLoadImages(images, config);
    return () => {
      images.current = {};
    };
  }, [config]);

  return (
    <div>
      <canvas width={700} height={700} ref={canvasRef} />
    </div>
  );
}
