import { whackAmoleConfigState } from "@/atoms/whackAmole/config";
import { useState, useEffect, RefObject } from "react";
import { useRecoilValue } from "recoil";

interface UseAnimationProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  images: RefObject<{ [key: string]: HTMLImageElement }>;
}

export const useAnimation = ({
  canvasRef,
  images,
  context,
}: UseAnimationProps) => {
  const config = useRecoilValue(whackAmoleConfigState);
};
