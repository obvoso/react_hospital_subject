import { useAnimate } from "@/hooks/route/useAnimate";
import { MapHeight, MapWidth, Mark } from "@/type/route/Mark";
import { useRef } from "react";

interface CanvasProps {
  level: number;
  marks: Mark[];
}

export default function Canvas({ marks, level }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAnimate({ level, canvasRef, marks });

  return (
    <div>
      <canvas ref={canvasRef} width={MapWidth} height={MapHeight}></canvas>
    </div>
  );
}
