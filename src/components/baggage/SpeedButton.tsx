import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BaggageGameConfigState, GameSpeed } from "@/atoms/baggage/game";
import { BaggageSpeed } from "@/assets/baggage/baggageGameConfig";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function SpeedButton() {
  const config = useRecoilValue(BaggageGameConfigState);
  const [currentSpeed, setCurrentSpeed] = useRecoilState(GameSpeed);

  useEffect(() => {
    setCurrentSpeed(config?.speed);
  }, [config?.speed]);

  const handleSetSpeed = (event: SelectChangeEvent) => {
    setCurrentSpeed(Number(event.target.value));
  };

  return (
    <div className="flex sm:flex-col flex-row bg-white shadow-lg rounded-2xl p-3 w-fit h-fit z-10">
      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">속도</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentSpeed ? currentSpeed.toString() : ""}
          label="Speed"
          onChange={handleSetSpeed}
        >
          <MenuItem value={BaggageSpeed.SPEED0}>매우 느림</MenuItem>
          <MenuItem value={BaggageSpeed.SPEED1}>느림</MenuItem>
          <MenuItem value={BaggageSpeed.SPEED2}>조금 느림</MenuItem>
          <MenuItem value={BaggageSpeed.SPEED3}>보통</MenuItem>
          <MenuItem value={BaggageSpeed.SPEED4}>조금 빠름</MenuItem>
          <MenuItem value={BaggageSpeed.SPEED5}>빠름</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
