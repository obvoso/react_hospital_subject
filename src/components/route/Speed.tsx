import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { vehicleSpeedState } from "@/atoms/route/game";
import { customRouteState } from "@/atoms/route/custom";

interface Props {
  level: number;
}

export default function Speed({ level }: Props) {
  const customRoute = useRecoilValue(customRouteState);
  const config = level < 13 ? routeGameConfigList[level] : customRoute;
  const setSpeed = useSetRecoilState(vehicleSpeedState);

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
      <label className="flex flex-row sm:flex-col items-center text-center text-gray-500 text-sm font-semibold ">
        속도 (초)
        <input
          type="number"
          className="flex pl-3 py-2 sm:mt-2 ml-2 sm:ml-0 text-center bg-gray-100 text-black font-normal "
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
