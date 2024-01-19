import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { useRecoilValue } from "recoil";
import KeyDownButton from "./KeyDownButton";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import React from "react";
import { BaggageCustomState, Custom } from "@/atoms/baggage/custom";

interface KeyDownButtonsProps {
  level: number;
}

function KeyDownButtons({ level }: KeyDownButtonsProps) {
  const itemAnimations = useRecoilValue(ItemAnimationState);
  const { keysPressed, checkForMatchAndScore, scoreText } = useKeyPress();
  const [leftPressed, rightPressed, downPressed] = keysPressed;
  const custom = useRecoilValue(BaggageCustomState);

  const getScoreClass = (score: string) => {
    switch (score) {
      case "PERFECT":
        return "perfect";
      case "FAST":
        return "fast";
      case "SLOW":
        return "slow";
      case "BAD":
        return "bad";
      case "MISS":
        return "miss";
      default:
        return "";
    }
  };

  return (
    <div className="flex">
      <div className="flex absolute inset-0 items-center justify-center">
        <div className={`flex mb-32 min-w-[200px] w-24 h-20 justify-center`}>
          <span
            key={scoreText}
            className={`scoreAnimation font-semibold text-lg ${getScoreClass(
              scoreText
            )}`}
          >
            {scoreText}
          </span>
        </div>
      </div>
      <KeyDownButton
        downPressed={leftPressed}
        checkForMatchAndScore={() =>
          checkForMatchAndScore("ArrowLeft", itemAnimations)
        }
      >
        <ArrowCircleLeftTwoToneIcon />
      </KeyDownButton>
      {((level >= 6 && level !== 8 && level !== 9 && level <= 11) ||
        (level > 11 &&
          (custom === Custom.COLOR_3 || custom === Custom.TYPE_3))) && (
        <KeyDownButton
          downPressed={downPressed}
          checkForMatchAndScore={() =>
            checkForMatchAndScore("ArrowDown", itemAnimations)
          }
        >
          <ArrowCircleDownTwoToneIcon />
        </KeyDownButton>
      )}
      <KeyDownButton
        downPressed={rightPressed}
        checkForMatchAndScore={() =>
          checkForMatchAndScore("ArrowRight", itemAnimations)
        }
      >
        <ArrowCircleRightTwoToneIcon />
      </KeyDownButton>
    </div>
  );
}

export default React.memo(KeyDownButtons);
