import { memo, useRef } from "react";
import { useRecoilValue } from "recoil";
import { BaggageGameConfigState } from "@/atoms/baggage/game";
import { useAnimation } from "@/hooks/baggage/useAnimation";
import KeyDownButtons from "./KeyDownButtons";
import usePreLoadImages from "@/hooks/baggage/usePreLoadImages";
import { CONVEYOR_HEIGHT, CONVEYOR_WIDTH } from "@/type/baggage/conveyor";

interface BaggageCanvasProps {
  level: number;
}

function BaggageCanvas({ level }: BaggageCanvasProps) {
  if (Number.isNaN(level)) return null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = useRecoilValue(BaggageGameConfigState);
  const { images } = usePreLoadImages({ level, canvasRef });

  useAnimation({ canvasRef, images });

  const leveling =
    level > 11
      ? "버튼을 사용해 선택해주세요."
      : level > 1
      ? level - 1 + "단계"
      : "연습";

  return (
    <div className="flex relative flex-col items-center min-w-[500px]">
      <div className="flex flex-col z-10 bg-white p-4 rounded-xl shadow-md">
        <span className="text-base font-bold text-center">{leveling}</span>
        <span className="text-lg text-center whitespace-pre-line">
          {config.subject}
        </span>
      </div>
      <div
        className={`flex w-[220px] h-[550px] justify-center bg-conveyor`}
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="flex w-[220px] relative mt-[-80px] h-fit">
          <div className="bg-white/40 absolute bottom-[50px] w-full h-[150px] rounded-2xl border-4 border-green-600" />
          <canvas
            ref={canvasRef}
            width={CONVEYOR_WIDTH}
            height={CONVEYOR_HEIGHT}
          />
        </div>
      </div>
      <div className="flex mt-4">
        <KeyDownButtons level={level} key={level} />
      </div>
    </div>
  );
}

export default memo(BaggageCanvas);
