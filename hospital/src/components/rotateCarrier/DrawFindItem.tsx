import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  index: number;
  uniqueKey: any;
  handleAnswer: (uniqueKey: any) => void;
}

export const DrawFindItem = ({
  image,
  index,
  handleAnswer,
  uniqueKey,
}: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 hover:bg-gray-200 active:bg-blue-200"
      onClick={() => handleAnswer(uniqueKey)}
    >
      <Image src={image} alt="findItems" width={200} height={200} />
      <span className="w-12 bg-black text-white text-center">{index + 1}</span>
    </div>
  );
};
