import useMatterJs from "@/hooks/souvenir/useMatterJs";
import useMouseEvent from "@/hooks/souvenir/useMouseEvent";
import React, { useRef } from "react";

export default function SouvenirGame() {
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useMatterJs({ boxRef });
  useMouseEvent(engineRef);

  return <div ref={boxRef} />;
}
