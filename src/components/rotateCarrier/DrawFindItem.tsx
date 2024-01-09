import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  image: string;
  index: number;
  isAnswer: boolean;
  handleAnswer: (index: number) => void;
}

export const DrawFindItem = ({
  image,
  index,
  handleAnswer,
  isAnswer,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const activeColor = isAnswer ? "rgb(191 219 254)" : "rgb(254 202 202)";

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 hover:bg-gray-200 cursor-pointer`}
      style={{ backgroundColor: isActive ? activeColor : "" }}
      onClick={() => handleAnswer(index)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Image src={image} alt="findItems" width={200} height={200} />
      <span className="w-12 bg-black text-white text-center">{index + 1}</span>
    </div>
  );
};
