import React from "react";
import FindItemControlButton from "../rotateCarrier/FindItemControlButton";
import SelectsDropDown from "./SelectsDropDown";
import SelectsRotationAngle from "./SelectRotationAngle";
import { DropDownButton } from "./DropDownButton";
import { ANGLE } from "@/utils/carrierRotation/carrierRotateGameConfig";
import { RotateCarrierGameState } from "@/atoms/rotateCarrier/config";
import { useRecoilValue } from "recoil";

interface CustomButtonsProps {
  gridSize: number;
  obstacleSize: number;
  itemSize: number;
  findDirection: boolean;
  findExist: boolean;
  setFindDirection: (findDirection: boolean) => void;
  setFindExist: (findExist: boolean) => void;
  setGridSize: (gridSize: number) => void;
  setObstacle: (obstacle: number) => void;
  setFindItem: (findItem: string[]) => void;
  setRotate: (rotate: number) => void;
  setRotateAngle: (rotateAngle: number[]) => void;
}
export default function CustomButtons({
  gridSize,
  obstacleSize,
  itemSize,
  findDirection,
  findExist,
  setFindDirection,
  setFindExist,
  setGridSize,
  setObstacle,
  setFindItem,
  setRotate,
  setRotateAngle,
}: CustomButtonsProps) {
  const gameState = useRecoilValue(RotateCarrierGameState);

  const gridSizeOptions = [
    { label: "2칸", value: 2 },
    { label: "4칸", value: 4 },
    { label: "6칸", value: 6 },
  ];

  const obstacleOptions = [
    { label: "없음", value: 0 },
    { label: "1개", value: 1 },
    { label: "2개", value: 2 },
  ];

  const findItemOptions = [
    { label: "1", value: "item0_0" },
    { label: "2", value: "item1_0" },
    { label: "3", value: "item2_0" },
    { label: "4", value: "item4_0" },
    { label: "5", value: "item5_0" },
  ];

  const rotateOptions = [
    { label: "1번", value: 1 },
    { label: "2번", value: 2 },
    { label: "3번", value: 3 },
    { label: "4번", value: 4 },
    { label: "5번", value: 5 },
  ];

  const rotateAngleOptions = [
    { label: "90도", value: ANGLE.ANGLE_90 },
    { label: "180도", value: ANGLE.ANGLE_180 },
    { label: "270도", value: ANGLE.ANGLE_270 },
  ];

  return (
    <>
      <FindItemControlButton
        findDirection={findDirection}
        findItemExist={findExist}
        setFindDirection={setFindDirection}
        setFindItemExist={setFindExist}
        disabled={gameState.start}
      />
      <div className="flex flex-row pt-5 items-center">
        <DropDownButton
          label="격자 크기"
          options={gridSizeOptions}
          onChange={(gridSize: number) => setGridSize(gridSize)}
        />

        <SelectsDropDown
          key={gridSize}
          label="찾을 아이템"
          options={findItemOptions}
          onChange={(findItem: string[]) => setFindItem(findItem)}
          max={gridSize - obstacleSize}
        />
        <DropDownButton
          label="방해 요소"
          options={
            gridSize - itemSize === 0
              ? obstacleOptions.slice(0, 1)
              : gridSize - itemSize === 1
              ? obstacleOptions.slice(0, 2)
              : obstacleOptions
          }
          onChange={(obstacle: number) => setObstacle(obstacle)}
        />
        <DropDownButton
          label="회전 횟수"
          options={rotateOptions}
          onChange={(rotate: number) => setRotate(rotate)}
        />
        <SelectsRotationAngle
          label="회전 각도"
          options={rotateAngleOptions}
          onChange={(rotateAngle: number[]) => setRotateAngle(rotateAngle)}
        />
      </div>
    </>
  );
}
