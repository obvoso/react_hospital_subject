import { Mark } from "@/type/route/Mark";
import { useEffect } from "react";

interface AutoCursorProps {
  marks: Mark[];
  level: number;
  containerRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (priority: number) => void;
  handleMouseUp: () => void;
}

export function useAutoCursor({
  marks,
  level,
  containerRef,
  handleMouseDown,
  handleMouseUp,
}: AutoCursorProps) {
  useEffect(() => {
    if (level !== 11 || marks.length === 0 || !containerRef.current) return;

    // Cursor 이미지 생성 및 스타일 설정
    const cursor = document.createElement("img");
    const containerRect = containerRef.current.getBoundingClientRect();
    cursor.src = "/assets/route/cursor.png";

    cursor.style.position = "absolute";
    cursor.style.pointerEvents = "none";
    cursor.style.width = "50px";
    cursor.style.height = "50px";
    document.body.appendChild(cursor);

    // 좌표 설정

    let currentMarkIndex = marks.length - 1;
    const cursorSpeed = 3; // 조절 가능한 속도

    const animateCursor = (prevX?: number, prevY?: number) => {
      if (currentMarkIndex < 0) {
        document.body.removeChild(cursor);
        return;
      }

      const currentMark = marks[currentMarkIndex];
      const targetX = currentMark.x + containerRect.left;
      const targetY = currentMark.y + containerRect.top;
      let cursorX = prevX ? prevX : targetX - 50;
      let cursorY = prevY ? prevY : targetY - 50;
      let speed = 0;
      const totalDistance = Math.sqrt(
        Math.pow(targetX - cursorX, 2) + Math.pow(targetY - cursorY, 2)
      );

      const move = () => {
        speed += cursorSpeed;
        const distanceFraction = Math.min(speed / totalDistance, 1);

        const x = cursorX + (targetX - cursorX) * distanceFraction;
        const y = cursorY + (targetY - cursorY) * distanceFraction;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

        // 마크 위치에 도달했는지 확인
        if (distanceFraction >= 1) {
          handleMouseDown(currentMark.priority);
          handleMouseUp();
          setTimeout(() => {
            currentMarkIndex--;
            animateCursor(x, y); // 현재 좌표를 다음 호출에 넘김
          }, 100); // 100ms 후에 다음 마크로 이동
        } else requestAnimationFrame(move);
      };
      move();
    };

    const timer = setTimeout(() => {
      animateCursor();
    }, 10000);

    return () => {
      if (cursor.parentNode) {
        document.body.removeChild(cursor);
      }
      clearTimeout(timer);
    };
  }, [marks, level]);
}
