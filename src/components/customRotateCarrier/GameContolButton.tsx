import { useRecoilState } from "recoil";
import CustomButton from "@/utils/CustomButton";
import useGameControl from "@/hooks/rotateCarrier/useGameControl";
import {
  RotateCarrierConfigState,
  RotateCarrierGameState,
} from "@/atoms/rotateCarrier/config";

interface params {
  nextLevelBtn: boolean;
  setNextLevelBtn: (value: boolean) => void;
}

export default function GameContolButton({
  nextLevelBtn,
  setNextLevelBtn,
}: params) {
  const [gameState, setGameState] = useRecoilState(RotateCarrierGameState);
  const [config, setConfig] = useRecoilState(RotateCarrierConfigState);
  const { handleRestart, handleStart, handleGameClear } = useGameControl({
    level: 11,
    nextLevelBtn,
    setNextLevelBtn,
  });

  return (
    <div className="flex justify-center items-center space-x-4">
      <CustomButton
        text="게임 시작"
        onClick={handleStart}
        type={
          !gameState.start && !nextLevelBtn && config.findItems
            ? "activate"
            : "disabled"
        }
      />
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
