import React, { useEffect } from "react";
import { Mark } from "@/type/route/Mark";
import { showRotueLineState } from "@/atoms/route/custom";
import { useRecoilValue } from "recoil";
import { routeGameState } from "@/atoms/route/game";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  level: number;
  marks: Mark[];
  correctRoute: Record<number, boolean>;
}

export default function useDrawRouteLine({
  canvasRef,
  level,
  marks,
  correctRoute,
}: Props) {
  const showRouteLine = useRecoilValue(showRotueLineState);
  const gameState = useRecoilValue(routeGameState);

  // 캔버스와 경로 그리기 로직 초기화
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
  }, [level, marks, gameState.start]);

  const drawRoute = (fromMark: Mark, toMark: Mark) => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const correctionX = 25;
    const correctionY = 25;

    context.lineWidth = 5;
    context.strokeStyle = "rgb(129 140 248)";
    context.moveTo(fromMark.x + correctionX, fromMark.y + correctionY);
    context.lineTo(toMark.x + correctionX, toMark.y + correctionY);
    context.stroke();
  };

  useEffect(() => {
    if (!showRouteLine) return;
    if (marks.length === 0) return;

    if (Object.keys(correctRoute).length > 0) {
      const correctMarks = Object.keys(correctRoute).map((priority) => {
        return marks.find((mark) => mark.priority === Number(priority))!;
      });

      for (let i = 0; i < correctMarks.length - 1; i++) {
        drawRoute(correctMarks[i], correctMarks[i + 1]);
      }
    }
  }, [correctRoute, showRouteLine]);
}
