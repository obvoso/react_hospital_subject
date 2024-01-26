import { useAnimate } from "@/hooks/route/useAnimate";
import { MapHeight, MapWidth, Mark } from "@/type/route/Mark";
import { memo, useRef } from "react";

interface CanvasProps {
  level: number;
  marks: Mark[];
}

function Canvas({ marks, level }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //useAnimate({ level, canvasRef, marks });

  return (
    <div>
      <canvas ref={canvasRef} width={MapWidth} height={MapHeight}></canvas>
    </div>
  );
}

export default memo(Canvas);
