import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { useRecoilState } from "recoil";
import KeyDownButton from "./KeyDownButton";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";

interface KeyDownButtonsProps {
  level: number;
}

export default function KeyDownButtons({ level }: KeyDownButtonsProps) {
  const [itemAnimations, setItemAnimations] =
    useRecoilState(ItemAnimationState);
  const { keysPressed, checkForMatchAndScore, scoreText } = useKeyPress();
  const [leftPressed, rightPressed, downPressed] = keysPressed;

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
      <div className="flex absolute inset-0 items-center justify-center min-h-[850px]">
        <div className="flex relative mb-8 sm:mb-52 full-screen-mb ml-4 sm:ml-[-130px] md:ml-[-220px] h-20 min-w-[300px] justify-center">
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
      {level >= 6 && level !== 8 && level !== 9 && (
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
