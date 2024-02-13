import { useEffect, useState, useRef } from "react";
import { Engine, Render, Runner, World, Bodies, Body, Events } from "matter-js";
import { ITEM_BASE } from "@/assets/souvenir/item";
import { Isouvenir } from "@/type/souvenir/Isouvenir";
import { ICustomBodyDefinition } from "@/type/souvenir/ICustomBodyDefinition";
import {
  createSmoke,
  updateAndDrawSmoke,
} from "@/components/souvenir/createSmoke";

const GamePage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null); // engine을 useRef로 관리
  const [disableAction, setDisableAction] = useState(false);
  const disableActionRef = useRef(false);
  const [currentFruit, setCurrentFruit] = useState<Isouvenir | null>(null);
  const [currentBody, setCurrentBody] = useState<Body | null>(null);
  let interval: NodeJS.Timeout | null = null;

  const addFruit = () => {
    const engine = engineRef.current;
    if (!engine) return; // engine이 없으면 함수를 빠져나옴

    const index = Math.floor(Math.random() * 5);
    const fruit = ITEM_BASE[index];

    const body = Bodies.circle(300, 50, fruit.radius, {
      index: index,
      isSleeping: true,
      render: {
        sprite: { texture: `${fruit.name}.png`, xScale: 1, yScale: 1 },
      },
      restitution: 0.2,
    } as ICustomBodyDefinition);

    setCurrentFruit(fruit);
    setCurrentBody(body);
    World.add(engine.world, body);
  };
  useEffect(() => {
    // Engine, World 및 Render 객체 생성
    engineRef.current = Engine.create(); // engineRef에 Engine 인스턴스 저장
    const engine = engineRef.current;
    const render = Render.create({
      engine: engine,
      element: boxRef.current!,
      options: {
        wireframes: false,
        background: "#F7F4C8",
        width: 620,
        height: 850,
      },
    });

    // 게임 로직 여기에 구현
    const leftWall = Bodies.rectangle(15, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const rightWall = Bodies.rectangle(605, 395, 30, 790, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const ground = Bodies.rectangle(310, 820, 620, 60, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const topLine = Bodies.rectangle(310, 150, 620, 2, {
      isSensor: true,
      isStatic: true,
      render: { fillStyle: "#E6B143" },
      label: "topLine",
    });

    World.add(engine.world, [leftWall, rightWall, ground, topLine]);

    // 첫 번째 과일 추가
    addFruit();

    Events.on(render, "afterRender", () => {
      const ctx = render.context; // matter-js 렌더러의 콘텍스트를 가져옵니다.
      updateAndDrawSmoke(ctx); // 연기 업데이트 및 그리기 함수 호출
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      //Runner.stop(runner);
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    // let disableAction = false;
    // 키보드 이벤트 핸들러

    const handleKeyDown = (event: KeyboardEvent) => {
      if (disableAction || !currentBody) return;
      switch (event.code) {
        case "ArrowLeft":
          if (interval) return;
          interval = setInterval(() => {
            if (!currentBody || !currentFruit) return;
            //벽 못뚫게 조건문 추가
            if (currentBody.position.x - currentFruit.radius > 30) {
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
            if (!currentBody || !currentFruit) return;
            if (currentBody.position.x + currentFruit.radius < 590) {
              Body.setPosition(currentBody, {
                x: currentBody.position.x + 1,
                y: currentBody.position.y,
              });
            }
          }, 5);
          break;
        case "ArrowDown":
          //키보드 연타, 과일 떨어트린 후 조작 불가
          // disableAction = true;
          setDisableAction(true);
          disableActionRef.current = true;
          // 떨어트리기
          currentBody.isSleeping = false;
          //1초 뒤에 다음 과일 추가,
          setTimeout(() => {
            addFruit();
            // disableAction = false;
            setDisableAction(false);
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
  }, [disableAction, currentBody, currentFruit]);
  // }, [currentBody, currentFruit]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
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

          createSmoke(collisionPointX, collisionPointY, (bodyA.index + 1) * 10);

          if (index === ITEM_BASE.length - 1) return;

          console.log(bodyA, bodyB);
          World.remove(engine.world, [bodyA, bodyB]);

          const newFruit = ITEM_BASE[index + 1];
          const newBody = Bodies.circle(
            pair.collision.supports[0].x,
            pair.collision.supports[0].y,
            newFruit.radius,
            {
              index: index + 1,
              render: {
                sprite: {
                  texture: `${newFruit.name}.png`,
                  xScale: 1,
                  yScale: 1,
                },
              },
              restitution: 0.2,
            } as ICustomBodyDefinition
          );

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

  return <div ref={boxRef} />;
};

export default GamePage;
