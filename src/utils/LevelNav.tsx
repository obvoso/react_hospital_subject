import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface LevelNavProps {
  game: string;
}

function LevelButton(game: string, level: number, isClicked: boolean) {
  const buttonColor = isClicked ? "bg-blue-500" : "bg-blue-200";
  const text = level === 0 ? "연습 1" : level === 1 ? "연습 2" : level - 1;
  return (
    <Link href={`/${game}/${level}`}>
      <button
        className={` ${buttonColor} hover:bg-blue-400 text-white text-sm font-semibold py-1 px-2 sm:my-1 mx-1 rounded sm:w-16 shadow-md`}
      >
        {text}
      </button>
    </Link>
  );
}

export default function LevelNav({ game }: LevelNavProps) {
  const router = useRouter();
  const level = Number(router.query.level);
  const [currentLevel, setCurrentLevel] = useState(level);

  useEffect(() => {
    if (router.isReady) setCurrentLevel(level);
  }, [router.isReady, level]);

  return (
    <div className="flex sm:flex-col flex-row bg-white shadow-lg rounded-2xl p-3 w-fit h-fit">
      {[...Array(12).keys()].map((level) =>
        LevelButton(game, level, level === currentLevel)
      )}
    </div>
  );
}
