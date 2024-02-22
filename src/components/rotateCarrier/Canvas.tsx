import React, { useRef, useEffect, RefObject } from "react";
import { useRecoilValue } from "recoil";
import { preLoadImages } from "./index";
import { RotateCarrierConfigState } from "@/atoms/rotateCarrier/config";
import { useMouseEvent } from "@/hooks/rotateCarrier/useMouseEvent";
import { useAnimation } from "@/hooks/rotateCarrier/useAnimation";

interface CanvasProps {
  images: RefObject<{ [key: string]: HTMLImageElement }>;
}

export default function Canvas({ images }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const config = useRecoilValue(RotateCarrierConfigState);
  const { clickedRectIndex } = useMouseEvent(canvasRef, config);
  useAnimation({
    canvasRef,
    images,
    config,
    clickedRectIndex,
  });

  // useEffect(() => {
  //   preLoadImages(images, config);
  // }, [config]);

  return (
    <div>
      <canvas width={500} height={500} ref={canvasRef} />
    </div>
  );
}
