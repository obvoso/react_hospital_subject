import React, { useRef } from "react";
import useHandleGame from "@/hooks/souvenir/useHandleGame";
import useMatterJs from "@/hooks/souvenir/useMatterJs";

export default function SouvenirGame() {
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useMatterJs({ boxRef });

  useHandleGame(engineRef);

  return <div>{<div ref={boxRef} />}</div>;
}
