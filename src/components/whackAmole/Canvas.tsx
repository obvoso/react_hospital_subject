import React, { useEffect, useRef } from "react";
import preLoadImages from "./utils/preLoadImages";
import { useRecoilValue } from "recoil";
import { whackAmoleConfigState } from "@/atoms/whackAmole/config";
import { useAnimation } from "@/hooks/whackAmole/useAnimation";
import Image from "next/image";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = canvasRef.current?.getContext("2d")!;
  const images = useRef<{ [key: string]: HTMLImageElement }>({});
  const config = useRecoilValue(whackAmoleConfigState);

  useAnimation({
    canvasRef,
    context: canvasRef.current?.getContext("2d")!,
    images,
  });

  useEffect(() => {
    const fetchImages = async () => await preLoadImages(images, config);
    if (config.level > -1) {
      fetchImages();
    }
    return () => {
      images.current = {};
    };
  }, [config]);

  return (
    <div className="bg-grass w-[800px] h-[450px] bg-cover flex flex-col items-center">
      <div className="flex items-center justify-center px-12 mt-12 w-[50%] h-24 rounded-[2.5rem] bg-[rgba(255,255,255,0.5)]">
        {config.answerItems.map((item) => {
          return (
            <Image
              src={`/assets/whackAmole/${item}.png`}
              width={80}
              height={80}
              alt={item}
              className="mx-6"
            />
          );
        })}
      </div>
      <div className="mt-10">
        <canvas width={800} height={200} ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
