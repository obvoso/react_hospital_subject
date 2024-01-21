import { MapHeight, MapWidth, Mark } from "@/type/route/MarkPosition";
import Image from "next/image";
import React from "react";

interface MarkProps {
  marks: Mark[];
}

function DrawMark({ mark }: { mark: Mark }) {
  const markStyle = {
    position: "absolute",
    left: `${mark.x}px`,
    top: `${mark.y}px`,
  };
  return (
    <div style={markStyle}>
      <Image
        src={`/assets/route/${mark.image}.png`}
        width={50}
        height={50}
        alt={mark.image}
        className="hover:cursor-pointer hover:scale-125 transition-all duration-300"
      />
    </div>
  );
}

export default function Mark({ marks }: MarkProps) {
  return (
    <div className={`flex absolute w-[${MapWidth}px] h-[${MapHeight}px]`}>
      <div className="flex relative w-full h-full z-10">
        {marks.map((mark) => (
          <DrawMark mark={mark} key={mark.priority} />
        ))}
      </div>
    </div>
  );
}
