import { BaggageGameConfigState, BaggageScore } from "@/atoms/baggage/game";
import { useRecoilValue } from "recoil";

export default function CurrentScore() {
  const score = useRecoilValue(BaggageScore);
  const config = useRecoilValue(BaggageGameConfigState);
  if (!config) return;

  return (
    <div className="flex w-full text-lg font-semibold">
      <span className="bg-blue-300 text-white text-sm rounded-full py-1 px-3 ml-5 text-center">
        점수
      </span>
      <span className="ml-2 w-14 text-gray-500">
        {score} / {config.items}
      </span>
    </div>
  );
}
