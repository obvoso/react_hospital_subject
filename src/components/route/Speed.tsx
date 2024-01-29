import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { vehicleSpeedState } from "@/atoms/route/game";

interface Props {
  level: number;
}

export default function Speed({ level }: Props) {
  const config = routeGameConfigList[level];
  const [speed, setSpeed] = useRecoilState(vehicleSpeedState);

  useEffect(() => {
    setSpeed(config.speed);
  }, [level]);

  const handleChangeSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputSpeed = Number(e.target.value);
    const movingPixelDistance = 7 / inputSpeed;

    setSpeed(movingPixelDistance);
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-2 mt-2">
      <label className="flex flex-row sm:flex-col items-center text-center">
        속도 (초)
        <input
          type="number"
          className="flex px-3 py-2 sm:mt-2 ml-2 sm:ml-0 text-center bg-gray-100"
          placeholder="속도"
          min="0.5"
          max="5"
          step="0.25"
          defaultValue={level < 6 ? 1 : 0.75}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeSpeed(e)
          }
        />
      </label>
    </div>
  );
}
