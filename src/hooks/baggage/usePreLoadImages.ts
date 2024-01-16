import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import { BaggageGameConfigState } from "@/atoms/baggage/game";
import { preloadImages } from "@/components/baggage";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface params {
  level: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function usePreLoadImages({ canvasRef, level }: params) {
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const config = useRecoilValue(BaggageGameConfigState);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);

  useEffect(() => {
    if (!canvasRef.current) return;
    preloadImages(
      canvasRef,
      images,
      itemAnimations,
      setItemAnimations,
      config,
      setImagesLoaded
    );
    return () => {
      images.current = {};
      setItemAnimations([]);
    };
  }, [level, config]);

  return { images, imagesLoaded };
}
