import { useRecoilValue } from "recoil";
import { RotateCarrierGameState } from "@/atoms/rotateCarrier/config";
import CustomButton from "@/utils/CustomButton";
import useGameControl from "@/hooks/rotateCarrier/useGameControl";

interface params {
  level: number;
  nextLevelBtn: boolean;
  setNextLevelBtn: (value: boolean) => void;
}

export default function GameContolButton({
  level,
  nextLevelBtn,
  setNextLevelBtn,
}: params) {
  const gameState = useRecoilValue(RotateCarrierGameState);
  const { handleRestart, handleNextLevel, handleStart, handleGameClear } =
    useGameControl({
      level,
      nextLevelBtn,
      setNextLevelBtn,
    });

  return (
    <div className="flex justify-center items-center space-x-4">
      <CustomButton
        text="게임 시작"
        onClick={handleStart}
        type={!gameState.start && !nextLevelBtn ? "activate" : "disabled"}
      />
      {nextLevelBtn && level < 10 && (
        <CustomButton
          text="다음 단계"
          onClick={handleNextLevel}
          type="activate"
        />
      )}
      {nextLevelBtn && (
        <CustomButton
          text="처음으로"
          onClick={handleGameClear}
          type="activate"
        />
      )}
      {nextLevelBtn && !gameState.start && (
        <CustomButton
          text="다시 시작"
          onClick={handleRestart}
          type="activate"
        />
      )}
    </div>
  );
}
