import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapHeight, MapWidth, Mark } from "@/type/route/Mark";
import { routeGameState } from "@/atoms/route/game";
import { useSetRecoilState } from "recoil";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { useAutoCursor } from "@/hooks/route/useAutoCursor";
import DrawMark from "./DrawMark";

interface MarkProps {
  marks: Mark[];
  level: number;
  clickAble: boolean;
}

export default function Mark({ marks, level, clickAble }: MarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = routeGameConfigList[level];
  const setGameState = useSetRecoilState(routeGameState);
  const [clickCount, setClickCount] = useState(0);
  const [correctRoute, setCorrectRoute] = useState<Record<number, boolean>>({});
  const [clickedMarks, setClickedMarks] = useState<
    Record<number, boolean | null>
  >({});

  const handleMouseDown = (priority: number) => {
    let isCorrect = false;
    if (
      clickCount === priority ||
      level === 11 ||
      (config.transit &&
        marks[priority].x === marks[config.mark].x &&
        marks[priority].y === marks[config.mark].y)
    )
      isCorrect = true;
    setClickedMarks({ ...clickedMarks, [priority]: isCorrect });

    //종료 조건
    if (isCorrect) {
      if (clickCount + 1 === marks.length || (level === 11 && priority === 1)) {
        setGameState((prev) => ({ ...prev, start: false }));
        setTimeout(() => {
          setClickCount(0);
          setCorrectRoute({});
        }, 1000);
      }
      setClickCount(clickCount + 1);
      if (clickCount === priority || (level === 11 && priority === 1))
        setCorrectRoute({ ...correctRoute, [priority]: true });
      else if (config.transit) {
        setCorrectRoute({
          ...correctRoute,
          [config.mark]: true,
          [priority]: false,
        });
      }
    }
  };

  const handleMouseUp = () => {
    const timer = setTimeout(() => {
      setClickedMarks({});
    }, 200);
    return () => clearTimeout(timer);
  };

  useAutoCursor({
    marks,
    level,
    containerRef,
    handleMouseDown,
    handleMouseUp,
  });

  return (
    <div
      ref={containerRef}
      className={`flex absolute w-[${MapWidth}px] h-[${MapHeight}px]`}
    >
      <div className="flex relative w-full h-full z-10">
        {marks
          .filter((mark) =>
            config.transit ? mark.priority < config.mark : true
          )
          .map((mark) => (
            <DrawMark
              mark={mark}
              correctRoute={correctRoute}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              key={mark.priority}
              isCorrect={clickedMarks[mark.priority]}
              endIndex={config.mark}
              clickAble={level !== 11 && clickAble}
            />
          ))}
      </div>
    </div>
  );
}
