import { RefObject } from "react";
import { ItemAnimation } from "../BaggageCanvas";
import { BaggageStatus } from "@/utils/constEnum";
import { shuffleArrayKeepingIndex } from "../index";

export const preloadImages = (
  canvasRef: RefObject<HTMLCanvasElement>,
  images: RefObject<{ [key: string]: HTMLImageElement }>,
  itemAnimations: ItemAnimation[],
  setItemAnimations: (item: ItemAnimation[]) => void,
  imageFiles: string[]
) => {
  let imagesToLoad = imageFiles.length;
  imageFiles.forEach((file) => {
    const img = new Image();
    img.onload = () => {
      if (!images.current) return;
      images.current[file] = img;
      imagesToLoad--;
      if (
        imagesToLoad === 0 &&
        canvasRef.current &&
        itemAnimations.length === 0
      ) {
        const newItems = Array.from({ length: 5 }, (_, i) => ({
          startTime: 0,
          yPosition: 0,
          status: i % 2 === 0 ? BaggageStatus.BLUE : BaggageStatus.YELLOW,
          done: false,
          index: i,
        }));
        setItemAnimations(shuffleArrayKeepingIndex(newItems));
      }
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${file}`);
      imagesToLoad--;
    };
    img.src = `/assets/baggage/${file}.png`;
  });
};

export default preloadImages;
