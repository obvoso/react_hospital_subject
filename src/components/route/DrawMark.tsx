import React, { memo, useCallback } from "react";
import { Mark } from "@/type/route/Mark";
import Image from "next/image";

interface DrawMarkProps {
  mark: Mark;
  correctRoute: Record<number, boolean>;
  handleMouseDown: (priority: number) => void;
  handleMouseUp: () => void;
  isCorrect: boolean | null;
  endIndex: number;
  clickAble: boolean;
}

function DrawRoutePriority({ priority }: { priority: number }) {
  return (
    <div className="flex justify-center items-center w-full h-10">
      <div className="flex w-6 h-6 text-indigo-400 font-semibold items-center  justify-center rounded-full border-2 border-indigo-400">
        {priority}
      </div>
    </div>
  );
}

export default React.memo(function DrawMark({
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
      <div className="flex absolute flex-row ml-[-7px] w-16 h-10">
        {correctRoute[mark.priority] && (
          <DrawRoutePriority priority={mark.priority + 1} />
        )}
        {correctRoute[endIndex] && !correctRoute[mark.priority] && (
          <>
            <DrawRoutePriority priority={mark.priority + 1} />
            <DrawRoutePriority priority={endIndex + 1} />
          </>
        )}
      </div>
    </div>
  );
});
