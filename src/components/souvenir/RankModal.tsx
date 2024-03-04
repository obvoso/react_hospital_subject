import { gameStatus } from "@/atoms/souvenir/game";
import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface RankModalProps {
  modal: boolean;
  closeModal: () => void;
}

export default function RankModal({ modal, closeModal }: RankModalProps) {
  const gameState = useRecoilValue(gameStatus);
  const [scoredArr, setScoredArr] = useState<number[]>([]);

  useEffect(() => {
    const scoredString = localStorage.getItem("scored");
    const scored = scoredString ? JSON.parse(scoredString) : [];
    setScoredArr(scored);
  }, [gameState]);

  return (
    <Modal
      open={modal}
      onClose={closeModal}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <div
        className="flex relative flex-col w-[250px] h-[400px] mb-[200px] bg-[#FFF2CC] border-8  border-souvenir-main rounded-xl shadow-xl items-center justify-center"
        onClick={(e: any) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute flex top-3 right-3 bg-red-400 rounded-full shadow-md w-[25px] h-[25px] justify-center items-center font-extrabold text-white hover:scale-125"
        >
          X
        </button>
        <div className="flex flex-col border-t-2 border-b-2 border-souvenir-main items-center h-fit mt-2 w-[60%] py-1">
          <span className="outline-title text-2xl">최고 점수</span>
          <span className="outline-title text-2xl">{scoredArr[0]}</span>
        </div>
        <div className="bg-[#fce4bb] w-[70%] h-[220px] rounded-3xl mt-5 border-souvenir-main border-4">
          <div className="flex flex-col items-center justify-center h-full">
            <Rank
              Icon={<Gold />}
              score={scoredArr[0] ? scoredArr[0] : 0}
              rank={1}
            />
            <Rank
              Icon={<Silver />}
              score={scoredArr[1] ? scoredArr[1] : 0}
              rank={2}
            />
            <Rank
              Icon={<Bronze />}
              score={scoredArr[2] ? scoredArr[2] : 0}
              rank={3}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

const Rank = ({
  Icon,
  score,
  rank,
}: {
  Icon: React.ReactNode;
  score: number;
  rank: number;
}) => {
  return (
    <div className="flex flex-row items-center w-full justify-center h-[80px]">
      <div className="flex flex-row items-center justify-center pl-2 gap-x-1 w-[45%]">
        <span className="flex outline-title items-center text-lg pt-1">
          {rank}등
        </span>
        {Icon}
      </div>
      <span className="outline-title w-[50%] text-2xl pl-2 pt-1">{score}</span>
    </div>
  );
};

export const Gold = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 36 36"
    >
      <path fill="#55acee" d="m18 8l-7-8H0l14 17l11.521-4.75z" />
      <path fill="#3b88c3" d="m25 0l-7 8l5.39 7.312l1.227-1.489L36 0z" />
      <path
        fill="#ffac33"
        d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307"
      />
      <path
        fill="#9e5200"
        d="M19.404 18.6h-1.721l-2.73 2.132a.528.528 0 0 0-.112.28v1.178c0 .186.15.354.337.354h1.795v8.414c0 .188.15.355.355.355h2.076c.186 0 .336-.168.336-.355V18.954c0-.186-.149-.354-.336-.354"
      />
    </svg>
  );
};

const Silver = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 36 36"
    >
      <path fill="#55acee" d="m18 8l-7-8H0l14 17l11.521-4.75z" />
      <path fill="#3b88c3" d="m25 0l-7 8l5.39 7.312l1.227-1.489L36 0z" />
      <path
        fill="#ccd6dd"
        d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307"
      />
      <path
        fill="#627077"
        d="M22.002 28.921h-3.543c.878-1.234 2.412-3.234 3.01-4.301c.449-.879.729-1.439.729-2.43c0-2.076-1.57-3.777-4.244-3.777c-2.225 0-3.74 1.832-3.74 1.832c-.131.15-.112.374.019.487l1.141 1.159a.36.36 0 0 0 .523 0c.355-.393 1.047-.935 1.813-.935c1.047 0 1.646.635 1.646 1.346c0 .523-.243 1.047-.486 1.421c-1.104 1.682-3.871 5.441-4.955 6.862v.374c0 .188.149.355.355.355h7.732a.368.368 0 0 0 .355-.355v-1.682a.367.367 0 0 0-.355-.356"
      />
    </svg>
  );
};

const Bronze = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 36 36"
    >
      <path fill="#55acee" d="m18 8l-7-8H0l14 17l11.521-4.75z" />
      <path fill="#3b88c3" d="m25 0l-7 8l5.39 7.312l1.227-1.489L36 0z" />
      <path
        fill="#ff8a3b"
        d="M23.205 16.026c.08-.217.131-.448.131-.693a2 2 0 0 0-2-2h-6.667a2 2 0 0 0-2 2c0 .245.05.476.131.693c-3.258 1.826-5.464 5.307-5.464 9.307C7.335 31.224 12.111 36 18.002 36s10.667-4.776 10.667-10.667c0-4-2.206-7.481-5.464-9.307"
      />
      <path
        fill="#7c4119"
        d="m14.121 29.35l1.178-1.178a.345.345 0 0 1 .467-.038s1.159.861 2.056.861c.805 0 1.628-.673 1.628-1.496s-.842-1.514-2.225-1.514h-.639a.367.367 0 0 1-.354-.355v-1.552c0-.206.168-.355.354-.355h.639c1.309 0 2-.635 2-1.439c0-.805-.691-1.402-1.496-1.402c-.823 0-1.346.43-1.626.747c-.132.15-.355.15-.504.02l-1.141-1.122c-.151-.132-.132-.355 0-.486c0 0 1.533-1.646 3.57-1.646c2.169 0 4.039 1.328 4.039 3.422c0 1.439-1.085 2.505-1.926 2.897v.057c.879.374 2.262 1.533 2.262 3.141c0 2.038-1.776 3.572-4.357 3.572c-2.354 0-3.552-1.16-3.944-1.664c-.113-.134-.093-.34.019-.47"
      />
    </svg>
  );
};
