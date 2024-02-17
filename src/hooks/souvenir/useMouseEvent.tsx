import { gameStatus } from "@/atoms/souvenir/game";
import {
  currentBodyState,
  currentItemState,
  itemsArray,
} from "@/atoms/souvenir/itemsArray";
import { ISouvenir } from "@/type/souvenir/ISouvenir";
import { addItem } from "@/utils/souvenir/addItem";
import { Body, Engine } from "matter-js";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface IUseHandleGame {
  engineRef: React.RefObject<Engine | null>;
}

export default function useMouseEvent({ engineRef }: IUseHandleGame) {
  const game = useRecoilValue(gameStatus);
  const [currentItem, setCurrentItem] = useRecoilState(currentItemState);
  const [currentBody, setCurrentBody] = useRecoilState(currentBodyState);
  const [itemsArr, setItemsArr] = useRecoilState(itemsArray);
  const disableActionRef = useRef<boolean>(false);
  let timer: NodeJS.Timeout;

  //마우스 이벤트
  useEffect(() => {
    let mouseDown = false;
    let startX = 0;
    if (!game) return;

    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
      let clientX: number;

      if ("touches" in event) clientX = event.touches[0].clientX;
      else clientX = event.clientX;

      if (disableActionRef.current || !currentBody) return;
      mouseDown = true;
      startX = clientX;
    };
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      let currentX: number;

      if ("touches" in event) currentX = event.touches[0].clientX;
      else currentX = event.clientX;

      if (
        !mouseDown ||
        disableActionRef.current ||
        !currentBody ||
        !currentItem
      )
        return;

      const moveDistance = currentX - startX;

      let newPositionX = currentBody.position.x + moveDistance;

      if (
        newPositionX - currentItem.radius > 10 &&
        newPositionX + currentItem.radius < 390
      ) {
        Body.setPosition(currentBody, {
          x: newPositionX,
          y: currentBody.position.y,
        });
      }

      startX = currentX;
    };

    const handleMouseUp = () => {
      if (!mouseDown) return;
      mouseDown = false;
      if (!currentBody) return;

      disableActionRef.current = true;
      currentBody.isSleeping = false;

      timer = setTimeout(() => {
        if (!engineRef.current) return;
        addItem(engineRef, setCurrentItemAndBody, [...itemsArr], setItemsArray);
        disableActionRef.current = false;
      }, 1000);
    };

    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [currentBody, currentItem, game]);

  function setCurrentItemAndBody(fruit: ISouvenir, body: Body) {
    setCurrentItem(fruit);
    setCurrentBody(body);
  }

  const setItemsArray = (items: number[]) => {
    setItemsArr(items);
  };
}
