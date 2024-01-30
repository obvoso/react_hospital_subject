import { useEffect, useRef, useState } from "react";
import { MapHeight, MapWidth, Mark } from "@/type/route/Mark";
import { routeGameState } from "@/atoms/route/game";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { useAutoCursor } from "@/hooks/route/useAutoCursor";
import { customRouteState } from "@/atoms/route/custom";
import DrawMark from "./DrawMark";
import { isTransitMark } from "@/utils/route/arraysHaveSameSequence";

interface MarkProps {
  marks: Mark[];
  level: number;
  clickAble: boolean;
}

export default function Mark({ marks, level, clickAble }: MarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const customRoute = useRecoilValue(customRouteState);
  const config = level < 13 ? routeGameConfigList[level] : customRoute;
  const setGameState = useSetRecoilState(routeGameState);
  const [clickCount, setClickCount] = useState(0);
  const [correctRoute, setCorrectRoute] = useState<Record<number, boolean>>({});
  const [clickedMarks, setClickedMarks] = useState<
    Record<number, boolean | null>
  >({});

  useEffect(() => {
    setCorrectRoute({});
    setClickCount(0);
    setClickedMarks({});
  }, [level, marks]);

  const handleMouseDown = (priority: number) => {
    let isCorrect = false;
    /**
     * 1. clickCount가 priority와 같으면 정답
     * 2. level이 11이면 정답(하드코딩..ㅋ)
     * 3. 경유 상태이고 현재 클릭한 마크가 목표 마크와 같으면 정답 (경유지는 마지막 인덱스에 있어서 클릭카운트랑 비교함)
     */
    if (
      clickCount === priority ||
      level === 11 ||
      (config.transit &&
        clickCount === config.mark &&
        clickCount !== priority &&
        isTransitMark(marks, priority) == 2)
    )
      isCorrect = true;
    setClickedMarks({ ...clickedMarks, [priority]: isCorrect });

    //종료 조건
    if (isCorrect) {
      if (clickCount + 1 === marks.length || (level === 11 && priority === 1)) {
        setGameState((prev) => ({ ...prev, start: false }));
      }
      setClickCount(clickCount + 1);
      if (clickCount === priority || (level === 11 && priority === 1))
        setCorrectRoute({ ...correctRoute, [priority]: true });
      else if (config.transit) {
        setCorrectRoute({
          ...correctRoute,
          [config.mark + 1]: true,
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
    moveAble: clickAble,
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
              endIndex={config.mark + 1}
              clickAble={level !== 11 && clickAble}
            />
          ))}
      </div>
    </div>
  );
}
