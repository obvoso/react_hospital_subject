import { useEffect, useRef, useState } from "react";
import { addItem } from "@/utils/souvenir/addItem";
import { Bodies, Body, Composite, Engine, Events, World } from "matter-js";
import { ISouvenir } from "@/type/souvenir/Isouvenir";
import { ITEM_BASE } from "@/assets/souvenir/item";
import { ICustomBodyDefinition } from "@/type/souvenir/ICustomBodyDefinition";
import { createSmoke } from "@/utils/souvenir/createSmoke";
import Matter from "matter-js";

interface IUseMouseEvent {
  engineRef: React.MutableRefObject<Engine | null>;
}

export default function useMouseEvent({ engineRef }: IUseMouseEvent) {
  const disableActionRef = useRef<boolean>(false);
  const [currentItem, setCurrentItem] = useState<ISouvenir | null>(null);
  const [currentBody, setCurrentBody] = useState<Body | null>(null);
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disableActionRef.current || !currentBody) return;
      switch (event.code) {
        case "ArrowLeft":
          if (interval) return;
          interval = setInterval(() => {
            if (!currentBody || !currentItem) return;
            //벽 못뚫게 조건문 추가
            if (currentBody.position.x - currentItem.radius > 10) {
              Body.setPosition(currentBody, {
                x: currentBody.position.x - 1,
                y: currentBody.position.y,
              });
            }
          }, 5);
          break;
        case "ArrowRight":
          if (interval) return;
          interval = setInterval(() => {
            if (!currentBody || !currentItem) return;
            if (currentBody.position.x + currentItem.radius < 390) {
              Body.setPosition(currentBody, {
                x: currentBody.position.x + 1,
                y: currentBody.position.y,
              });
            }
          }, 5);
          break;
        case "ArrowDown":
          //키보드 연타, 과일 떨어트린 후 조작 불가능
          disableActionRef.current = true;
          // 떨어트리기
          currentBody.isSleeping = false;

          //1초 뒤에 다음 과일 추가,
          setTimeout(() => {
            addItem(engineRef, setCurrentItemAndBody);
            disableActionRef.current = false;
          }, 1000);
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowLeft":
        case "ArrowRight":
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentBody, currentItem]);

  //충돌 이벤트
  useEffect(() => {
    const engine = engineRef.current;

    if (!engine) return;
    // 첫 번째 과일 추가
    addItem(engineRef, setCurrentItemAndBody);

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

          createSmoke(collisionPointX, collisionPointY, (bodyA.index + 1) * 10);

          if (index === ITEM_BASE.length - 1) return;

          World.remove(engine.world, [bodyA, bodyB]);

          const newFruit = ITEM_BASE[index + 1];

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

          // 10번째 아이템이 합쳐지면 바닥 추가
          if (index === 1 || index === 2 || index === 3) {
            // ground 객체 참조를 가정, 실제 ground 객체의 위치 및 크기에 맞게 조정 필요
            const groundHeight = 20; // ground의 높이
            const newWallHeight = 40; // 추가할 벽의 높이
            adjustBodiesForNewWall(engine, newWallHeight, groundHeight);
            const newWall = Bodies.rectangle(
              200,
              650 - groundHeight - newWallHeight / 2,
              400,
              newWallHeight,
              {
                isStatic: true,
                render: { fillStyle: "#E66143" },
              }
            );

            newY -= 40;
            World.add(engine.world, newWall);
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

          World.add(engine.world, newBody);
        }
        // 게임 오버 조건
        if (
          !disableActionRef.current &&
          (bodyA.label === "topLine" || bodyB.label === "topLine")
        ) {
          alert("Game over");
        }
      });
    });
  }, []);

  function setCurrentItemAndBody(fruit: ISouvenir, body: Body) {
    setCurrentItem(fruit);
    setCurrentBody(body);
  }
}
