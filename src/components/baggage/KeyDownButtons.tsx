import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ItemAnimationState } from "@/atoms/baggage/animationItem";
import { useKeyPress } from "@/hooks/baggage/useKeyPress";
import { useRecoilValue } from "recoil";
import KeyDownButton from "./KeyDownButton";
import { BaggageCustomState, Custom } from "@/atoms/baggage/custom";

interface KeyDownButtonsProps {
  level: number;
}

function KeyDownButtons({ level }: KeyDownButtonsProps) {
  const itemAnimations = useRecoilValue(ItemAnimationState);
  const { keysPressed, checkForMatchAndScore, scoreText } = useKeyPress();
  const [leftPressed, rightPressed, downPressed] = keysPressed;
  const custom = useRecoilValue(BaggageCustomState);
  const [keyType, setKeyType] = useState(0);
  const carrier_width = 50;
  const carrier_height = 80;

  useEffect(() => {
    console.log(level, custom);
    if (level < 6 || (level > 11 && custom === Custom.COLOR_2)) {
      setKeyType(Custom.COLOR_2);
    } else if (
      level === 6 ||
      level === 7 ||
      (level > 11 && custom === Custom.COLOR_3)
    ) {
      setKeyType(Custom.COLOR_3);
    } else if (
      level === 8 ||
      level === 9 ||
      (level > 11 && custom === Custom.TYPE_2)
    ) {
      setKeyType(Custom.TYPE_2);
    } else if (
      level === 10 ||
      level === 11 ||
      (level > 11 && custom === Custom.TYPE_3)
    ) {
      setKeyType(Custom.TYPE_3);
    }
  }, [custom, level]);

  const getScoreClass = (score: string) => {
    switch (score) {
      case "좋아요!":
        return "perfect";
      case "아쉬워요!":
        return "bad";
      default:
        return "";
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col absolute inset-0 items-center justify-center">
        <div className={`flex min-w-[200px] mt-32 w-24 h-20 justify-center`}>
          <span
            key={scoreText}
            className={`scoreAnimation font-semibold text-2xl ${getScoreClass(
              scoreText
            )}`}
          >
            {scoreText}
          </span>
        </div>
        <div className="left-0 mt-[26rem] absolute ">
          <KeyDownButton
            downPressed={leftPressed}
            checkForMatchAndScore={() =>
              checkForMatchAndScore("ArrowLeft", itemAnimations)
            }
          >
            <Image
              src={`/assets/baggage/${
                keyType === Custom.COLOR_2 || keyType === Custom.COLOR_3
                  ? "carrier_blue"
                  : "carrier_gray"
              }.png`}
              alt="left_button"
              width={carrier_width}
              height={carrier_height}
              style={{ width: carrier_width, height: carrier_height }}
            />
          </KeyDownButton>
        </div>
        {(keyType === Custom.COLOR_3 || keyType === Custom.TYPE_3) && (
          <div className="bottom-[-100px] absolute">
            <KeyDownButton
              downPressed={downPressed}
              checkForMatchAndScore={() =>
                checkForMatchAndScore("ArrowDown", itemAnimations)
              }
            >
              <Image
                src={`/assets/baggage/${
                  keyType === Custom.COLOR_3 ? "carrier_red" : "bag"
                }.png`}
                alt="down_button"
                width={carrier_height}
                height={carrier_width}
                style={{ width: carrier_height, height: carrier_width }}
              />
            </KeyDownButton>
          </div>
        )}
        <div className="right-0 mt-[26rem] absolute">
          <KeyDownButton
            downPressed={rightPressed}
            checkForMatchAndScore={() =>
              checkForMatchAndScore("ArrowRight", itemAnimations)
            }
          >
            <Image
              src={`/assets/baggage/${
                keyType === Custom.COLOR_2 || keyType === Custom.COLOR_3
                  ? "carrier_yellow"
                  : "basket"
              }.png`}
              alt="right_button"
              width={carrier_width}
              height={carrier_height}
              style={{ width: carrier_width, height: carrier_height }}
            />
          </KeyDownButton>
        </div>
      </div>
    </div>
  );
}

export default React.memo(KeyDownButtons);
