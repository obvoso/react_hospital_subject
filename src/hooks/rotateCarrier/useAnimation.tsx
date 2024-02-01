import { RefObject, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { RotateCarrierLevelConfig } from "@/assets/rotateCarrier/carrierRotateGameConfig";
import {
  RotateCarrierGameState,
  SubjectTextState,
} from "@/atoms/rotateCarrier/config";
import {
  drawRect,
  drawStaticElements,
  getRandomRotateDirection,
} from "@/components/rotateCarrier/index";

interface params {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  images: RefObject<{ [key: string]: HTMLImageElement }>;
  config: RotateCarrierLevelConfig;
  clickedRectIndex: number;
}

export const useAnimation = ({
  canvasRef,
  images,
  config,
  clickedRectIndex,
}: params) => {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const setSubject = useSetRecoilState(SubjectTextState);
  const RoundFloat = (num: number) => {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
  };
  const [showItemTime, setShowItemTime] = useState(3000);

  const draw = (context: CanvasRenderingContext2D, angle: number) => {
    if (!context) {
      return;
    }
    context.transform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.rotate(angle);
    if (!images.current) {
      return;
    }
    if (!images.current["carrier"]) {
      return;
    }
    context.drawImage(
      images.current["carrier"],
      -images.current["carrier"].width / 2 + 50,
      -images.current["carrier"].height / 2 + 80,
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

  const animateRotation = (context: CanvasRenderingContext2D) => {
    let rotateDirection = "";
    let degree = 0; //증가량은 속도
    let rotateCount = -1;
    let endAngle = 0;

    const initRotateInfo = () => {
      const rotateAngle = config.rotationAngle[++rotateCount];
      if (!rotateAngle) return;

      rotateDirection = getRandomRotateDirection();
      rotateDirection === "right"
        ? (endAngle += rotateAngle)
        : (endAngle -= rotateAngle);
    };

    initRotateInfo();

    const animateStep = () => {
      switch (rotateDirection) {
        case "right":
          degree = RoundFloat(degree + 0.015);
          if (degree >= endAngle) initRotateInfo();
          break;
        case "left":
          degree = RoundFloat(degree - 0.015);
          if (degree <= endAngle) initRotateInfo();
          break;
      }
      //종료조건
      if (rotateCount === config.rotation) {
        const lastDirection = ((endAngle % 4) + 4) % 4; // -4 ~ 3 범위를 0 ~ 3으로 변환
        setGameState((prev) => ({
          ...prev,
          lastAngle: RoundFloat(degree * (Math.PI / 2)),
          lastDirection: lastDirection,
        }));
        setSubject("물건의 위치는 어디에 있을까요?");
        return;
      }
      draw(context, RoundFloat(degree * (Math.PI / 2)));
      requestAnimationFrame(animateStep);
    };
    requestAnimationFrame(animateStep);
  };

  const animateQuestion = (context: CanvasRenderingContext2D) => {
    let startTime = Date.now(); // Record the start time
    console.log(showItemTime);

    const flash = () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < showItemTime) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        const alpha = Math.sin((elapsedTime / showItemTime) * Math.PI);
        drawStaticElements(context, images, config, alpha);
        requestAnimationFrame(flash);
      }
    };

    requestAnimationFrame(flash);
  };

  //레벨별로 보여주는 시간 조절
  useEffect(() => {
    let showItemTime = 3000;
    if (config.level <= 2) showItemTime = 3000;
    else if (config.level <= 6) showItemTime = 4000;
    else if (config.level <= 10) showItemTime = 5000;
    setShowItemTime(showItemTime);
  }, [config.level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (gameState.start) {
      console.log(showItemTime);
      animateQuestion(context); // start 누르고 정해진 시간동안 문제 보여주기
      setSubject("물건의 위치를 잘 기억해주세요.");
      const timer = setTimeout(() => {
        animateRotation(context), setSubject("캐리어가 회전합니다.");
      }, showItemTime); // start 누르고 정해진 초 후 애니메이션 시작
      return () => clearTimeout(timer);
    }
  }, [gameState.start, showItemTime]);

  //클릭시 클릭한 rect에 색칠
  useEffect(() => {
    if (!gameState.start) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    draw(context, gameState.lastAngle);
  }, [clickedRectIndex, gameState.start, images, gameState.lastAngle]);
};
