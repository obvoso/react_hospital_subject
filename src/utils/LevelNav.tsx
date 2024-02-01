import Link from "next/link";
import React from "react";

interface LevelNavProps {
  game: string;
  curLevel: number;
  disabled?: boolean;
}

interface LevelButtonProps {
  game: string;
  level: number;
  isClicked: boolean;
  disabled?: boolean;
}

function LevelButton({ game, level, isClicked, disabled }: LevelButtonProps) {
  const buttonColor = isClicked
    ? "bg-blue-500"
    : disabled
    ? "bg-gray-300"
    : "bg-blue-200";

  let text = level.toString();

  if (game === "route") {
    if (level === 0) text = "연습";
    else text = level.toString();
  } else if (game === "baggage") {
    console.log(level);
    if (level === 0) text = "연습 1";
    else if (level === 1) text = "연습 2";
    else text = (level - 1).toString();
  } else if (game === "rotate-carrier") {
    if (level === 0) text = "연습";
    else text = level.toString();
  }

  const destLevel = level === 3 && game === "route" ? 11 : level;

  return (
    <Link href={`/${game}/${destLevel}`}>
      <button
        className={` ${buttonColor} hover:bg-blue-400 text-white text-sm flex whitespace-nowrap justify-center font-semibold py-1 px-2 sm:my-1 mx-1 rounded sm:w-16 shadow-md ${
          disabled && "cursor-not-allowed"
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </Link>
  );
}

function LevelNav({ game, curLevel, disabled }: LevelNavProps) {
  const arrNum = game === "baggage" ? 12 : 11;

  return (
    <div className="flex sm:flex-col flex-row bg-white shadow-lg rounded-2xl p-3 w-fit h-fit z-10">
      {[...Array(arrNum).keys()].map((level) => (
        <LevelButton
          game={game}
          level={level}
          isClicked={
            level === curLevel ||
            (game === "route" &&
              level === 3 &&
              (curLevel === 11 || curLevel === 12))
          }
          key={level}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default React.memo(LevelNav);
