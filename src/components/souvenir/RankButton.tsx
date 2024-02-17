import React, { useState } from "react";
import RankModal from "./RankModal";

export default function RankButton() {
  const [rankModal, setRankModal] = useState(false);

  return (
    <div className="flex absolute items-center justify-center w-[100px] mt-20 ml-72">
      {rankModal && (
        <RankModal modal={rankModal} closeModal={() => setRankModal(false)} />
      )}
      <button
        onClick={() => {
          setRankModal(!rankModal);
        }}
        className="border-2 px-5 py-1 rounded-2xl border-souvenir-main hover:bg-[#f6e5b1]"
      >
        <span className="flex text-xl text-bold outline-title">순위</span>
      </button>
    </div>
  );
}
