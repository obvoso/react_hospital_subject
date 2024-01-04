import React, { useRef, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { preLoadImages } from "./index";
import { RotateCarrierConfigState } from "@/atoms/rotateCarrier/config";
import { useMouseEvent } from "@/hooks/rotateCarrier/useMouseEvent";
import { useAnimation } from "@/hooks/rotateCarrier/useAnimation";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const config = useRecoilValue(RotateCarrierConfigState);
  const { clickedRectIndex } = useMouseEvent(canvasRef, config);

  useAnimation({
    canvasRef,
    context: canvasRef.current?.getContext("2d")!,
    images,
    config,
    clickedRectIndex,
  });

  useEffect(() => {
    preLoadImages(images, config);
    return () => {
      images.current = {};
    };
  }, [config]);

  return (
    <div>
      <canvas width={700} height={700} ref={canvasRef} />
    </div>
  );
}