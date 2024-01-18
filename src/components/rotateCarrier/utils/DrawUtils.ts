import {
  RotateCarrierItemAssets,
  RotateCarrierLevelConfig,
} from "@/utils/carrierRotation/carrierRotateGameConfig";
import { RefObject } from "react";

export const drawRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) => {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
  context.lineWidth = 5;
  context.strokeRect(x, y, w, h);
};

export const drawStaticElements = (
  context: CanvasRenderingContext2D,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  config: RotateCarrierLevelConfig,
  alpha: number
) => {
  if (!context || !context.canvas) return;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.save();
  context.translate(context.canvas.width / 2, context.canvas.height / 2);

  if (!images.current) return;
  if (!images.current["carrier"]) return;

  context.drawImage(
    images.current["carrier"],
    -images.current["carrier"].width / 2 + 25,
    -images.current["carrier"].height / 2,
    config.carrier.point.w,
    config.carrier.point.h
  );

  config.space.forEach((rect) => {
    drawRect(context, rect.x, rect.y, rect.w, rect.h, "rgb(243,244,246)");
  });

  config.obstacles.forEach((item) => {
    if (!images.current) return;
    context.drawImage(
      images.current[item.imageKey],
      item.point.x,
      item.point.y,
      item.point.w,
      item.point.h
    );
  });

  config.questions.forEach((item) => {
    context.save();

    // 네온 효과를 위한 설정
    context.shadowBlur = 20;
    context.shadowColor = "#6CB4EE";

    context.globalAlpha = alpha;

    // 이미지 그리기
    if (!images.current) return;
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
