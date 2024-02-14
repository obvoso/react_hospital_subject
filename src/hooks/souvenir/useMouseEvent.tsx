import { useEffect, useRef, useState } from "react";
import { addItem } from "@/utils/souvenir/addItem";
import { Bodies, Body, Composite, Engine, Events, World } from "matter-js";
import { ISouvenir } from "@/type/souvenir/ISouvenir";
import { ITEM_BASE } from "@/assets/souvenir/item";
import { ICustomBodyDefinition } from "@/type/souvenir/ICustomBodyDefinition";
import { createSmoke } from "@/utils/souvenir/createSmoke";

interface IUseMouseEvent {
  engineRef: React.MutableRefObject<Engine | null>;
}

export default function useMouseEvent({ engineRef }: IUseMouseEvent) {
  const disableActionRef = useRef<boolean>(false);
  const prevCollisionRefs = useRef<number[]>([]);
  const [currentItem, setCurrentItem] = useState<ISouvenir | null>(null);
  const [currentBody, setCurrentBody] = useState<Body | null>(null);
  let timer: NodeJS.Timeout;

  useEffect(() => {
    let mouseDown = false;
    let startX = 0; // 마우스 클릭 시작 X 위치

    const handleMouseDown = (event: MouseEvent) => {
      if (disableActionRef.current || !currentBody) return;
      mouseDown = true;
      startX = event.clientX;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (
        !mouseDown ||
        disableActionRef.current ||
        !currentBody ||
        !currentItem
      )
        return;

      const currentX = event.clientX;
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
        addItem(engineRef, setCurrentItemAndBody);
        disableActionRef.current = false;
      }, 1000);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [currentBody, currentItem]);

  //충돌 이벤트
  useEffect(() => {
    const engine = engineRef.current;

    if (!engine) return;
    // 첫 번째 과일 추가
    addItem(engineRef, setCurrentItemAndBody);

    Events.on(engine, "collisionActive", (event) => {
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
          if (
            prevCollisionRefs.current.includes(bodyA.id) ||
            prevCollisionRefs.current.includes(bodyB.id)
          )
            return;
          World.remove(engine.world, [bodyA, bodyB]);

          const newFruit = ITEM_BASE[index + 1];

          // 10번째 아이템이 합쳐지면 바닥 추가
          if (index === 1 || index === 2 || index === 3) {
            // ground 객체 참조를 가정, 실제 ground 객체의 위치 및 크기에 맞게 조정 필요
            const groundHeight = 20; // ground의 높이
            const newWallHeight = 40; // 추가할 벽의 높이
            adjustBodiesForNewWall(engine, newWallHeight, groundHeight);
            const newWall = Bodies.rectangle(
              200,
              650 - groundHeight - newWallHeight / 2,
              380,
              newWallHeight,
              {
                isStatic: true,
                render: { fillStyle: "#FFBFAE" },
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

          prevCollisionRefs.current.push(bodyA.id, bodyB.id);
          World.add(engine.world, newBody);
        }

        // 게임 오버 조건
        if (
          (bodyA.label === "topLine" && isBodyStopped(bodyB)) ||
          (bodyB.label === "topLine" && isBodyStopped(bodyA))
        ) {
          alert("Game over");
          //Engine.clear(engine); // 엔진이 초기화되어서 아이템들이 다 아래로 떨어짐
          engine.timing.timeScale = 0; // 엔진 시간을 멈춤, 렌더는 되어있는데 일시정지 상태
        }
      });
    });
  }, []);

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
}