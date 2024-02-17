import { use, useEffect, useRef, useState } from "react";
import { addItem } from "@/utils/souvenir/addItem";
import { Bodies, Body, Composite, Engine, Events, World } from "matter-js";
import { ISouvenir } from "@/type/souvenir/ISouvenir";
import { ITEM_BASE } from "@/assets/souvenir/item";
import { ICustomBodyDefinition } from "@/type/souvenir/ICustomBodyDefinition";
import { createSmoke } from "@/utils/souvenir/createSmoke";
import { useRecoilState, useSetRecoilState } from "recoil";
import { gameScore, gameStatus } from "@/atoms/souvenir/game";
import { itemsArray } from "@/atoms/souvenir/itemsArray";

interface IUseHandleGame {
  engineRef: React.RefObject<Engine | null>;
}

export default function useHandleGame({ engineRef }: IUseHandleGame) {
  const disableActionRef = useRef<boolean>(false);
  const prevCollisionRefs = useRef<number[]>([]);
  const gameEndedRef = useRef<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ISouvenir | null>(null);
  const [currentBody, setCurrentBody] = useState<Body | null>(null);
  const [itemsArr, setItemsArr] = useRecoilState(itemsArray);
  const setScore = useSetRecoilState(gameScore);
  const [game, setGame] = useRecoilState(gameStatus);
  const [newWallFlag, setNewWallFlag] = useState<boolean>(false);
  const newWallFlagRef = useRef<boolean>(false);
  let timer: NodeJS.Timeout;
  let currGroundRef = useRef<number>(650);

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

  //충돌 이벤트
  useEffect(() => {
    const engine = engineRef.current;

    if (!engine) return;
    // 첫 번째 과일 추가
    const items = initItemsArray();
    addItem(engineRef, setCurrentItemAndBody, [...items], setItemsArray);

    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        // 충돌한 두 객체의 'index' 속성을 확인
        const bodyA: any = pair.bodyA;
        const bodyB: any = pair.bodyB;

        // 과일 합치기 로직
        if (bodyA.index === bodyB.index) {
          const index = bodyA.index;
          const collisionPointX = (bodyA.position.x + bodyB.position.x) / 2;
          const collisionPointY = (bodyA.position.y + bodyB.position.y) / 2;
          let newX = pair.collision.supports[0].x;
          let newY = pair.collision.supports[0].y;

          setScore((prev) => prev + (index + 1) * 2);
          if (index !== 11)
            createSmoke(
              collisionPointX,
              collisionPointY,
              (bodyA.index + 1) * 10
            );
          if (index === ITEM_BASE.length - 1) return;
          if (
            prevCollisionRefs.current.includes(bodyA.id) ||
            prevCollisionRefs.current.includes(bodyB.id)
          ) {
            return;
          }
          World.remove(engine.world, [bodyA, bodyB]);

          const newFruit = ITEM_BASE[index + 1];

          // 10번째 아이템이 합쳐지면 바닥 추가
          if (index === 8 && newWallFlagRef.current === false) {
            const groundHeight = 20; // ground의 높이
            const newWallHeight = 40; // 추가할 벽의 높이

            adjustBodiesForNewWall(engine, newWallHeight, groundHeight);

            const newWall = Bodies.rectangle(
              200,
              currGroundRef.current - groundHeight - newWallHeight / 2,
              380,
              newWallHeight,
              {
                isStatic: true,
                render: {
                  fillStyle: "#FFBFAE",
                  strokeStyle: "#E6B143",
                  lineWidth: 5,
                },
              }
            );

            newY -= 40;
            currGroundRef.current -= 40;
            console.log("fuc");
            World.add(engine.world, newWall);
            setNewWallFlag(true);
            newWallFlagRef.current = true;
          }

          const newBody = Bodies.circle(newX, newY, newFruit.radius, {
            index: index + 1,
            render: {
              sprite: {
                texture: `${newFruit.name}.png`,
                xScale: 1,
                yScale: 1,
              },
            },
            restitution: 0.2,
          } as ICustomBodyDefinition);

          prevCollisionRefs.current.push(bodyA.id, bodyB.id);
          World.add(engine.world, newBody);
        }
      });
    });

    Events.on(engine, "collisionActive", (event) => {
      if (gameEndedRef.current) return;
      event.pairs.forEach((pair) => {
        const bodyA: any = pair.bodyA;
        const bodyB: any = pair.bodyB;

        // 게임 오버 조건
        if (
          (bodyA.label === "topLine" && isBodyStopped(bodyB)) ||
          (bodyB.label === "topLine" && isBodyStopped(bodyA))
        ) {
          engine.timing.timeScale = 0; // 엔진 시간을 멈춤, 렌더는 되어있는데 일시정지 상태
          Engine.clear(engine); // 엔진이 초기화되어서 아이템들이 다 아래로 떨어짐
          gameEndedRef.current = true;
          setGame(false);
        }
      });
    });
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (newWallFlag && gameEndedRef.current === false) {
      const addNewWall = () => {
        console.log("effect");
        const groundHeight = 20; // ground의 높이
        const newWallHeight = 40; // 추가할 벽의 높이

        adjustBodiesForNewWall(engine, newWallHeight, groundHeight);

        const newWall = Bodies.rectangle(
          200,
          currGroundRef.current - groundHeight - newWallHeight / 2,
          380,
          newWallHeight,
          {
            isStatic: true,
            render: {
              fillStyle: "#FFBFAE",
              strokeStyle: "#E6B143",
              lineWidth: 5,
            },
          }
        );
        currGroundRef.current -= 40;
        World.add(engine.world, newWall);
      };
      setInterval(addNewWall, 1000 * 60);
    }
  }, [newWallFlag]);

  function setCurrentItemAndBody(fruit: ISouvenir, body: Body) {
    setCurrentItem(fruit);
    setCurrentBody(body);
  }

  const isBodyStopped = (body: Body) => {
    const threshold = 0.01; // 움직임을 감지할 최소 속도 값

    return (
      Math.abs(body.velocity.x) < threshold &&
      Math.abs(body.velocity.y) < threshold &&
      Math.abs(body.angularVelocity) < threshold
    );
  };

  const adjustBodiesForNewWall = (
    engine: Engine,
    newWallHeight: number,
    groundHeight: number
  ) => {
    const bodies = Composite.allBodies(engine.world);
    const newWallY = 650 - groundHeight - newWallHeight / 2; // 새로운 벽의 y 좌표 계산

    bodies.forEach((body) => {
      const customBody = body as unknown as ICustomBodyDefinition;
      if (
        customBody.index === 0 &&
        customBody.position &&
        customBody.position.y > newWallY - 33 / 2
      ) {
        // 기존 벽 위에 있는 index가 0인 물체를 새로운 벽 위로 옮김
        Body.setPosition(customBody as any, {
          x: customBody.position.x,
          y: newWallY - newWallHeight / 2 - 33 / 2,
        });
      }
    });
  };

  const initItemsArray = () => {
    let items = [];

    for (let i = 0; i < 12; i++) {
      items.push(Math.floor(Math.random() * 6));
    }
    setItemsArr(items);
    return items;
  };

  const setItemsArray = (items: number[]) => {
    setItemsArr(items);
  };
}
