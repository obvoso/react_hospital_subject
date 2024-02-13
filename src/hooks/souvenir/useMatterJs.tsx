import { useEffect, useRef } from "react";
import { updateAndDrawSmoke } from "@/utils/souvenir/createSmoke";
import { Engine, Render, Bodies, World, Events, Runner } from "matter-js";

interface IUseMatterJs {
  boxRef: React.RefObject<HTMLDivElement>;
}

export default function useMatterJs({ boxRef }: IUseMatterJs) {
  const engineRef = useRef<Engine | null>(null);

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
        width: 400,
        height: 650,
      },
    });

    const leftWall = Bodies.rectangle(5, 400, 10, 500, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const rightWall = Bodies.rectangle(395, 400, 10, 500, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const ground = Bodies.rectangle(200, 640, 400, 20, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
    });
    const topLine = Bodies.rectangle(200, 150, 400, 2, {
      isSensor: true,
      isStatic: true,
      render: { fillStyle: "#E6B143" },
      label: "topLine",
    });

    World.add(engine.world, [leftWall, rightWall, ground, topLine]);

    //// 첫 번째 과일 추가
    //addItem(engineRef, setCurrentItemAndBody);

    Events.on(render, "afterRender", () => {
      const ctx = render.context;
      updateAndDrawSmoke(ctx); // 연기 업데이트 및 그리기 함수 호출
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    return () => {
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, []);

  return { engineRef };
}
