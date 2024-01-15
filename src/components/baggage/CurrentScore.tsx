import { BaggageGameConfigState, BaggageScore } from "@/atoms/baggage/game";
import { useRecoilValue } from "recoil";

export default function CurrentScore() {
  const score = useRecoilValue(BaggageScore);
  const config = useRecoilValue(BaggageGameConfigState);

  return (
    <div className="text-lg font-semibold">
      점수: {score} / {config.items}
    </div>
  );
}
