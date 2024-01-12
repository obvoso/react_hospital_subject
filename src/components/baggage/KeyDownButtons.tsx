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
  const { keysPressed, checkForMatchAndScore } = useKeyPress();
  const [leftPressed, rightPressed, downPressed] = keysPressed;

  return (
    <div className="flex">
      <KeyDownButton
        downPressed={leftPressed}
        checkForMatchAndScore={() =>
          checkForMatchAndScore("ArrowLeft", itemAnimations, setItemAnimations)
        }
      >
        <ArrowCircleLeftTwoToneIcon />
      </KeyDownButton>
      {level >= 6 && level !== 8 && level !== 9 && (
        <KeyDownButton
          downPressed={downPressed}
          checkForMatchAndScore={() =>
            checkForMatchAndScore(
              "ArrowDown",
              itemAnimations,
              setItemAnimations
            )
          }
        >
          <ArrowCircleDownTwoToneIcon />
        </KeyDownButton>
      )}
      <KeyDownButton
        downPressed={rightPressed}
        checkForMatchAndScore={() =>
          checkForMatchAndScore("ArrowRight", itemAnimations, setItemAnimations)
        }
      >
        <ArrowCircleRightTwoToneIcon />
      </KeyDownButton>
    </div>
  );
}
