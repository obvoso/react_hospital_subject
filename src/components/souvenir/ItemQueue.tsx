//import { itemsArray } from "@/atoms/souvenir/itemsArray";
//import Image from "next/image";
//import React from "react";
//import { useRecoilValue } from "recoil";

//export default function ItemQueue() {
//  const itemsArr = useRecoilValue(itemsArray);
//  const itemCount = itemsArr.length - 1; // 중앙 요소를 제외한 개수
//  const radius = 60; // 원의 반지름
//  const centerItem = itemsArr[0]; // 중앙 요소
//  const angleStep = (2 * Math.PI) / itemCount; // 각 요소 간의 각도 차이

//  if (itemsArr.length === 0) return null;

//  return (
//    <div className="circle-container">
//      <div>
//        <Image
//          src={`/assets/souvenir/item/item${centerItem}.png`}
//          alt="centerItem"
//          width={50}
//          height={50}
//        />
//      </div>
//      {itemsArr.slice(1).map((item, index) => {
//        // 중앙 요소를 제외하고 각 요소의 위치 계산
//        const angle = angleStep * index;
//        const x = Math.cos(angle) * radius;
//        const y = Math.sin(angle) * radius;
//        return (
//          <div
//            key={index}
//            className="circle-item"
//            style={{
//              transform: `translate(${x}px, ${y}px)`,
//            }}
//          >
//            <Image
//              src={`/assets/souvenir/item/item${item}.png`}
//              alt={index.toString()}
//              width={25}
//              height={25}
//            />
//          </div>
//        );
//      })}
//    </div>
//  );
//}

import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import { itemsArray } from "@/atoms/souvenir/itemsArray";

export default function ItemQueue() {
  const itemsArr = useRecoilValue(itemsArray);
  const itemCount = itemsArr.length - 1; // 중앙 요소를 제외한 개수
  const radius = 60; // 원의 반지름
  const centerItem = itemsArr[0]; // 중앙 요소
  const angleStep = (2 * Math.PI) / itemCount; // 각 요소 간의 각도 차이

  if (itemsArr.length === 0) return null;

  return (
    <div className="circle-container">
      <div className="center-item">
        <Image
          src={`/assets/souvenir/item/item${centerItem}.png`}
          alt="centerItem"
          width={50}
          height={50}
        />
      </div>
      <div className="egg-outline"></div>
      {itemsArr.slice(1).map((item, index) => {
        const angle = angleStep * index;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
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
              width={25}
              height={25}
            />
          </div>
        );
      })}
    </div>
  );
}
