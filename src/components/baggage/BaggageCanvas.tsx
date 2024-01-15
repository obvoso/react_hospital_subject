import { useRef } from "react";
import { cmToPixels } from "@/utils/unit";
import { useRecoilValue } from "recoil";
import { BaggageGameConfigState } from "@/atoms/baggage/game";
import { useAnimation } from "@/hooks/baggage/useAnimation";
import KeyDownButtons from "./KeyDownButtons";
import React from "react";
import usePreLoadImages from "@/hooks/baggage/usePreLoadImages";

function BaggageCanvas({ level }: { level: number }) {
  if (Number.isNaN(level)) return null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = useRecoilValue(BaggageGameConfigState);
  const { images, imagesLoaded } = usePreLoadImages({ level, canvasRef });
  useAnimation({ canvasRef, images, imagesLoaded });

  return (
    <div className="flex flex-col items-center min-w-[500px]">
      <div className="flex flex-col z-10 bg-white p-4 rounded-xl shadow-md">
        <span className="text-lg font-bold text-center">
          {level > 1 ? level - 1 + "단계" : "연습"}
        </span>
        <span className="font-semibold text-center whitespace-pre-line">
          {config.subject}
        </span>
      </div>
      <div
        className={`flex w-[480px] h-[650px] justify-center ${
          level <= 5
            ? "bg-bg0"
            : level <= 7
            ? "bg-bg1"
            : level <= 9
            ? "bg-bg2"
            : "bg-bg3"
        } bg-cover`}
      >
        <div className="flex mt-[-110px]">
          <canvas
            ref={canvasRef}
            width={cmToPixels(3)}
            height={cmToPixels(8)}
          ></canvas>
        </div>
      </div>
      <div className="flex mt-4">
        <KeyDownButtons level={level} key={level} />
      </div>
    </div>
  );
}

export default React.memo(BaggageCanvas);
