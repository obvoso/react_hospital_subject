import { MapHeight, MapWidth, Mark } from "@/type/route/MarkPosition";
import { useRef } from "react";

interface CanvasProps {
  marks: Mark[];
}

export default function Canvas({ marks }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D>(null);

  return (
    <div>
      <canvas ref={canvasRef} width={MapWidth} height={MapHeight}></canvas>
    </div>
  );
}
