import { useEffect, useRef } from "react";
import { updateAndDrawSmoke } from "@/utils/souvenir/createSmoke";
import { Engine, Render, Bodies, World, Events, Runner } from "matter-js";

interface IUseMatterJs {
  boxRef: React.RefObject<HTMLDivElement>;
}

export default function useMatterJs({ boxRef }: IUseMatterJs) {
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);

  useEffect(() => {
    // Engine, World 및 Render 객체 생성
    engineRef.current = Engine.create();
    const engine = engineRef.current;
    engine.world.gravity.y = 2;
    renderRef.current = Render.create({
      engine: engine,
      element: boxRef.current!,
      options: {
        wireframes: false,
        background: "#FFF2CC",
        width: 400, // 초기 크기 설정
        height: 650,
      },
    });
    const render = renderRef.current;

    const leftWall = Bodies.rectangle(5, 400, 10, 500, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
      label: "leftWall",
    });
    const rightWall = Bodies.rectangle(395, 400, 10, 500, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
      label: "rightWall",
    });
    const ground = Bodies.rectangle(200, 640, 400, 20, {
      isStatic: true,
      render: { fillStyle: "#E6B143" },
      label: "ground",
    });
    const topLine = Bodies.rectangle(200, 150, 400, 2, {
      isSensor: true,
      isStatic: true,
      render: { fillStyle: "#E6B143" },
      label: "topLine",
    });

    World.add(engine.world, [leftWall, rightWall, ground, topLine]);

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
      if (renderRef.current && renderRef.current.canvas) {
        renderRef.current.canvas.remove();
      }
      render.textures = {};
    };
  }, []);

  return { engineRef };
}
