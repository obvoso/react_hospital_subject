import { useRef, useEffect } from "react";
import { cmToPixels } from "@/utils/unit";
import { drawStaticElements, preloadImages } from "./index";
import { useRecoilState, useRecoilValue } from "recoil";
import { BaggageGameConfigState } from "@/atoms/baggage/game";
import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import { useAnimation } from "@/hooks/baggage/useAnimation";
import KeyDownButtons from "./KeyDownButtons";

export default function BaggageCanvas({ level }: { level: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const config = useRecoilValue(BaggageGameConfigState);
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);

  useAnimation({ canvasRef, images });

  useEffect(() => {
    preloadImages(
      canvasRef,
      images,
      itemAnimations,
      setItemAnimations,
      config,
      drawStaticElements
    );
    return () => {
      images.current = {};
      setItemAnimations([]);
    };
  }, [config, level]);

  return (
    <div className="flex flex-col items-center min-w-[500px]">
      <div className="flex flex-col bg-white p-4 rounded-xl shadow-md">
        <span className="text-lg font-bold text-center">
          {level > 1 ? level - 1 + "단계" : "연습"}
        </span>
        <span className="font-semibold text-center whitespace-pre-line">
          {config.subject}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={cmToPixels(10)}
        height={cmToPixels(14)}
      ></canvas>
      <div className="flex mt-4">
        <KeyDownButtons level={level} key={level} />
      </div>
    </div>
  );
}
