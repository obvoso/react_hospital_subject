import useMatterJs from "@/hooks/souvenir/useMatterJs";
import useMouseEvent from "@/hooks/souvenir/useMouseEvent";
import React, { useRef } from "react";
import Score from "./Score";

export default function SouvenirGame() {
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useMatterJs({ boxRef });
  useMouseEvent(engineRef);

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex-none">
        <Score />
      </div>
      <div ref={boxRef} />
    </div>
  );
}
