import React from "react";
import { useRecoilState } from "recoil";
import { customRouteState } from "@/atoms/route/custom";
import {
  mapOptions,
  markOptions,
  obstacleOptions,
  transitOptions,
  directionOptions,
} from "@/type/route/custom";
import SelectsDropDown from "../customRotateCarrier/SelectsDropDown";
import { DropDownButton } from "../customRotateCarrier/DropDownButton";
import {
  InvalidGridMap0,
  InvalidGridMap1,
  InvalidGridMap2,
} from "@/assets/route/InvalidGrid";

export default function CustomControl() {
  const [customRoute, setCustomRoute] = useRecoilState(customRouteState);

  return (
    <div className="flex flex-row sm:flex-col items-center bg-white rounded-lg shadow-lg px-3 sm:py-6 py-4">
      <SelectsDropDown
        label="맵 선택"
        options={mapOptions}
        max={1}
        imagePath="/assets/route/"
        onChange={(value) =>
          setCustomRoute((prev) => ({
            ...prev,
            background: value,
            invalidGrid:
              value === "map0"
                ? InvalidGridMap0
                : value === "map1"
                ? InvalidGridMap1
                : InvalidGridMap2,
          }))
        }
      />
      <DropDownButton
        label="장소 갯수"
        options={markOptions}
        onChange={(value) =>
          setCustomRoute((prev) => ({ ...prev, mark: value }))
        }
      />
      <DropDownButton
        label="진행 방향"
        options={directionOptions}
        onChange={(value) =>
          setCustomRoute((prev) => ({ ...prev, direction: value }))
        }
      />
      <DropDownButton
        label="장애물 여부"
        options={obstacleOptions}
        onChange={(value) =>
          setCustomRoute((prev) => ({
            ...prev,
            obstacle: value ? true : false,
          }))
        }
      />
      <DropDownButton
        label="경유 여부"
        options={transitOptions}
        onChange={(value) =>
          setCustomRoute((prev) => ({ ...prev, transit: value }))
        }
      />
    </div>
  );
}
