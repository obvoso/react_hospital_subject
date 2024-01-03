import { RefObject, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import { RotateCarrierLevelConfig } from "@/utils/carrierRotation/carrierRotateGameConfig";
import {
  drawRect,
  drawStaticElements,
  getRandomRotateDirection,
} from "@/components/rotateCarrier/index";

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
  const setSubject = useSetRecoilState(SubjectTextState);

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
      config.carrier.point.w,
      config.carrier.point.h
    );

    config.space.forEach((rect, index) => {
      const isCorrect = config.answerDirection.includes(clickedRectIndex);
      const color =
        isCorrect && clickedRectIndex === index
          ? "#6CB4EE"
          : clickedRectIndex == index
          ? "red"
          : "rgb(243,244,246)";

      drawRect(context, rect.x, rect.y, rect.w, rect.h, color);
    });

    context.restore();
  };

  const animateRotation = () => {
    let rotateDirection = "";
    let degree = 0; //증가량은 속도
    let rotateCount = -1;
    let angle = 0;
    let endAngle = 0;

    const initRotateInfo = () => {
      rotateCount++;
      rotateDirection = getRandomRotateDirection();
      const rotateAngle = config.rotationAngle[rotateCount];
      if (!rotateAngle) return;
      rotateDirection === "right"
        ? (endAngle += rotateAngle)
        : (endAngle -= rotateAngle);

      setGameState((prev) => {
        return {
          ...prev,
          lastDirection:
            rotateDirection === "right" && rotateAngle
              ? prev.lastDirection + rotateAngle
              : prev.lastDirection - rotateAngle,
        };
      });
    };

    initRotateInfo();
    const animateStep = () => {
      switch (rotateDirection) {
        case "right":
          if (degree >= endAngle) initRotateInfo();
          degree += 0.015;
          break;
        case "left":
          if (degree <= endAngle) initRotateInfo();
          degree -= 0.015;
          break;
      }
      //종료조건
      if (rotateCount === config.rotation) {
        const lastDirection = ((gameState.lastDirection % 4) + 4) % 4; // -4 ~ 3 범위를 0 ~ 3으로 변환

        setGameState((prev) => ({
          ...prev,
          lastAngle: angle,
          lastDirection:
            lastDirection === 3 ? 1 : lastDirection === 1 ? 3 : lastDirection,
        }));
        setSubject("물건의 위치는 어디에 있을까요?");
        return;
      }

      angle = degree * (Math.PI / 2);
      draw(angle);
      requestAnimationFrame(animateStep);
    };
    requestAnimationFrame(animateStep);
  };

  const animateQuestion = (context: CanvasRenderingContext2D) => {
    let duration = 0;

    const flash = () => {
      const progress = Math.min(duration, 1.5);
      const alpha = Math.sin(progress * Math.PI);

      duration += 0.01;
      drawStaticElements(context, images, config, alpha);

      if (progress < 1.5) {
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
      setSubject("물건의 위치를 잘 기억해주세요.");
      setTimeout(() => {
        animateRotation(), setSubject("캐리어가 회전합니다.");
      }, 1500); // start 누르고 1.5초 후 애니메이션 시작
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
