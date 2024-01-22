import React, { useState } from "react";
import Image from "next/image";
import { MapHeight, MapWidth, Mark } from "@/type/route/Mark";

interface MarkProps {
  marks: Mark[];
}

interface DrawMarkProps {
  mark: Mark;
  correctRoute: Record<number, boolean>;
  handleMouseDown: (priority: number) => void;
  handleMouseUp: () => void;
  isCorrect: boolean | null;
}

function DrawMark({
  mark,
  correctRoute,
  handleMouseDown,
  handleMouseUp,
  isCorrect,
}: DrawMarkProps) {
  let backgroundColor = "";
  if (isCorrect) {
    backgroundColor = "rgba(0, 100, 200, 0.4)";
  } else if (isCorrect === false) {
    backgroundColor = "rgba(200, 50, 0, 0.4)";
  }

  console.log(backgroundColor);

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

      {correctRoute[mark.priority] && (
        <div className="flex absolute justify-center items-center w-full h-10">
          <div className="flex w-6 h-6 text-indigo-400 font-semibold items-center  justify-center rounded-full border-2 border-indigo-400">
            {mark.priority + 1}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarkComponent({ marks }: MarkProps) {
  const [clickCount, setClickCount] = useState(0);
  const [clickedMarks, setClickedMarks] = useState<
    Record<number, boolean | null>
  >({});
  const [correctRoute, setCorrectRoute] = useState<Record<number, boolean>>({});

  const handleMouseDown = (priority: number) => {
    const isCorrect = clickCount === priority;
    setClickedMarks({ ...clickedMarks, [priority]: isCorrect });

    if (isCorrect) {
      setClickCount(clickCount + 1);
      setCorrectRoute({ ...correctRoute, [priority]: true });
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
        {marks.map((mark) => (
          <DrawMark
            mark={mark}
            correctRoute={correctRoute}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            key={mark.priority}
            isCorrect={clickedMarks[mark.priority]}
          />
        ))}
      </div>
    </div>
  );
}
