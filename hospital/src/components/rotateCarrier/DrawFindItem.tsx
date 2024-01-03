import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  index: number;
  isAnswer?: boolean;
  handleAnswer: (index: number) => void;
}

export const DrawFindItem = ({
  image,
  index,
  handleAnswer,
  isAnswer,
}: Props) => {
  const activeColor = isAnswer ? "bg-blue-200" : "bg-red-200";
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 hover:bg-gray-200 active:${activeColor}`}
      onClick={() => handleAnswer(index)}
    >
      <Image src={image} alt="findItems" width={200} height={200} />
      <span className="w-12 bg-black text-white text-center">{index + 1}</span>
    </div>
  );
};