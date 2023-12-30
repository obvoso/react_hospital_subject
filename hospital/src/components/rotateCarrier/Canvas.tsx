import React, { useRef, useEffect, useState } from "react";
import { preLoadImages } from "./utils/preLoadImages";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
} from "@/atoms/rotateCarrier/config";
import { useRecoilState, useRecoilValue } from "recoil";
import { RotateCarrierItemAssets } from "@/utils/carrierRotation/carrierRotateGameConfig";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [clickedRect, setClickedRect] = useState(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const config = useRecoilValue(RotateCarrierConfigState);
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);

  const drawRect = (context, x, y, width, height, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.strokeRect(x, y, width, height);
  };

  const draw = (context, angle) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.rotate(angle); // Rotate based on the current angle
    context.drawImage(
      images.current["carrier"],
      -images.current["carrier"].width / 2,
      -images.current["carrier"].height / 2,
      config.item[0].point.w,
      config.item[0].point.h
    );

    // Draw rectangles with different colors based on state
    const rects = [
      { x: -120, y: -150, width: 190, height: 95 },
      { x: -120, y: -55, width: 190, height: 95 },
    ];
    rects.forEach((rect, index) => {
      const color = clickedRect === index ? "#6CB4EE" : "white";
      drawRect(context, rect.x, rect.y, rect.width, rect.height, color);
    });

    context.restore();
  };

  const drawStaticElements = (context, image, question, alpha) => {
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

  const animateQuestion = (context) => {
    let duration = 0;
    const flash = () => {
      const progress = Math.min(duration, 1);
      const alpha = Math.sin(progress * Math.PI);
      const question = config.item.slice(1, config.findItems + 1);
      duration += 0.015;
      drawStaticElements(context, null, question, alpha);

      if (progress < 1) {
        requestAnimationFrame(flash);
      }
    };

    requestAnimationFrame(flash);
  };

  const animate = (context) => {
    let degree = 0;
    const animateStep = () => {
      const progress = Math.min(degree, 1);
      const angle = progress * (Math.PI / 2); // Rotate 90 degrees over the duration
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
    const handlemouseDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX - canvas.width / 2;
      const y = (event.clientY - rect.top) * scaleY - canvas.height / 2;
      // Adjust for the rotation
      const rotatedX = x * Math.cos(-Math.PI / 2) - y * Math.sin(-Math.PI / 2);
      const rotatedY = x * Math.sin(-Math.PI / 2) + y * Math.cos(-Math.PI / 2);

      const rectIndex = config.space.findIndex((r) =>
        isMouseOverRect(r, rotatedX, rotatedY)
      );
      setClickedRect(rectIndex >= 0 ? rectIndex : null);
      if (rectIndex === config.answerDirection) {
        setGameState((prev) => {
          return {
            ...prev,
            score: prev.score + 1,
          };
        });
      }
    };

    const handlemouseUp = () => {
      setClickedRect(null);
    };

    // Attach event listeners
    canvas.addEventListener("mousedown", handlemouseDown);
    canvas.addEventListener("mouseup", handlemouseUp);

    // Detach event listeners on cleanup
    return () => {
      canvas.removeEventListener("mousedown", handlemouseDown);
      canvas.removeEventListener("mouseup", handlemouseUp);
    };
  }, [gameState.start]);

  useEffect(() => {
    if (!gameState.start) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    draw(context, Math.PI / 2);
  }, [clickedRect, gameState.start, images]);

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

const isMouseOverRect = (rect, mouseX, mouseY) => {
  const ret =
    mouseX >= rect.x &&
    mouseX <= rect.x + rect.w &&
    mouseY >= rect.y &&
    mouseY <= rect.y + rect.h;
  return ret;
};
