import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import { itemsArray } from "@/atoms/souvenir/itemsArray";

export default function ItemQueue() {
  const itemsArr = useRecoilValue(itemsArray);
  const itemCount = itemsArr.length - 1; // 중앙 요소를 제외한 개수
  const radius = 55; // 원의 반지름
  const centerItem = itemsArr[0]; // 중앙 요소
  const angleStep = (2 * Math.PI) / itemCount; // 각 요소 간의 각도 차이

  if (itemsArr.length === 0) return null;

  return (
    <div className="circle-container">
      <div className="">
        <Image
          src={`/assets/souvenir/bubble.png`}
          alt="centerItem"
          width={70}
          height={70}
          className="z-0 absolute bottom-[2.8rem] left-[2.7rem]"
        />
        <Image
          src={`/assets/souvenir/item/item${centerItem}.png`}
          alt="centerItem"
          width={40}
          height={40}
          className="z-10"
        />
      </div>
      <Image
        src="/assets/souvenir/queue.png"
        alt="queue"
        width={145}
        height={145}
        className="flex absolute mb-1 opacity-60"
      />
      {itemsArr.slice(1).map((item, index) => {
        const angle = angleStep * (index + 6) - 0.2;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;
        return (
          <div
            key={index}
            className="circle-item"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <Image
              src={`/assets/souvenir/item/item${item}.png`}
              alt={`item-${index}`}
              width={22}
              height={22}
            />
          </div>
        );
      })}
    </div>
  );
}
