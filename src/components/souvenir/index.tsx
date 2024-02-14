import useMatterJs from "@/hooks/souvenir/useMatterJs";
import useMouseEvent from "@/hooks/souvenir/useMouseEvent";
import React, { useRef } from "react";
import Score from "./Score";

export default function SouvenirGame() {
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useMatterJs({ boxRef });
  useMouseEvent(engineRef);

  return (
    <div>
      <Score />
      <div ref={boxRef} />
    </div>
  );
}
