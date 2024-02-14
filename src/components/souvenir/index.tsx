import useMatterJs from "@/hooks/souvenir/useMatterJs";
import useMouseEvent from "@/hooks/souvenir/useMouseEvent";
import React, { useRef } from "react";
import Score from "./Score";
import ItemQueue from "./ItemQueue";

export default function SouvenirGame() {
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useMatterJs({ boxRef });
  useMouseEvent(engineRef);

  return (
    <div className="flex relative flex-col items-center h-full">
      <ItemQueue />
      <div className="flex-none">
        <Score />
      </div>
      <div ref={boxRef} />
    </div>
  );
}
