import React, { useState } from "react";
import Image from "next/image";
import { MapHeight, MapWidth, Mark } from "@/type/route/Mark";
import { routeGameState } from "@/atoms/route/game";
import { useSetRecoilState } from "recoil";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";

interface MarkProps {
  marks: Mark[];
  level: number;
}

interface DrawMarkProps {
  mark: Mark;
  correctRoute: Record<number, boolean>;
  handleMouseDown: (priority: number) => void;
  handleMouseUp: () => void;
  isCorrect: boolean | null;
  endIndex: number;
}

function DrawMark({
  mark,
  correctRoute,
  handleMouseDown,
  handleMouseUp,
  isCorrect,
  endIndex,
}: DrawMarkProps) {
  let backgroundColor = "";
  if (isCorrect) {
    backgroundColor = "rgba(0, 100, 200, 0.4)";
  } else if (isCorrect === false) {
    backgroundColor = "rgba(200, 50, 0, 0.4)";
  }

  const markStyle: React.CSSProperties = {
    position: "absolute",
    left: `${mark.x}px`,
    top: `${mark.y}px`,
    borderRadius: "50%",
    background: backgroundColor
      ? `radial-gradient(circle, ${backgroundColor} 20%, transparent 70%)`
      : "",
  };

  return (
    <div style={markStyle}>
      <Image
        src={`/assets/route/${mark.image}.png`}
        width={0}
        height={0}
        alt={mark.image}
        sizes="50px"
        className="w-full h-auto hover:cursor-pointer hover:scale-125 transition-all duration-300"
        onMouseDown={() => handleMouseDown(mark.priority)}
        onMouseUp={handleMouseUp}
      />
      {(correctRoute[mark.priority] || correctRoute[endIndex]) && (
        <div className="flex absolute justify-center items-center w-full h-10">
          <div className="flex w-6 h-6 text-indigo-400 font-semibold items-center  justify-center rounded-full border-2 border-indigo-400">
            {correctRoute[mark.priority] ? (
              <>{mark.priority + 1}</>
            ) : (
              <>{endIndex + 1}</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Mark({ marks, level }: MarkProps) {
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
      (config.transit &&
        marks[priority].x === marks[config.mark].x &&
        marks[priority].y === marks[config.mark].y)
    )
      isCorrect = true;
    setClickedMarks({ ...clickedMarks, [priority]: isCorrect });

    //종료 조건
    if (isCorrect) {
      if (clickCount + 1 === marks.length) {
        setGameState((prev) => ({ ...prev, start: false }));
        setTimeout(() => {
          setClickCount(0);
          setCorrectRoute({});
        }, 1000);
      }
      setClickCount(clickCount + 1);
      if (clickCount === priority)
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

  return (
    <div className={`flex absolute w-[${MapWidth}px] h-[${MapHeight}px]`}>
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
            />
          ))}
      </div>
    </div>
  );
}
