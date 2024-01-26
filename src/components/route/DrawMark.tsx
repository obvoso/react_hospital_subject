import React, { useCallback } from "react";
import Image from "next/image";
import { Mark } from "@/type/route/Mark";

interface DrawMarkProps {
  mark: Mark;
  correctRoute: Record<number, boolean>;
  handleMouseDown: (priority: number) => void;
  handleMouseUp: () => void;
  isCorrect: boolean | null;
  endIndex: number;
  clickAble: boolean;
}

export default function DrawMark({
  mark,
  correctRoute,
  handleMouseDown,
  handleMouseUp,
  isCorrect,
  endIndex,
  clickAble,
}: DrawMarkProps) {
  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (clickAble) {
        handleMouseDown(mark.priority);
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [clickAble, mark.priority, handleMouseDown]
  );

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
        className={`w-full h-auto ${
          clickAble
            ? "hover:cursor-pointer hover:scale-125 transition-all duration-300"
            : "hover: cursor-not-allowed"
        }`}
        onMouseDown={onMouseDown}
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
