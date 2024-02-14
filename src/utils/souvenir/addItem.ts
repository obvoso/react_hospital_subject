import { ITEM_BASE } from "@/assets/souvenir/item";
import { ICustomBodyDefinition } from "@/type/souvenir/ICustomBodyDefinition";
import { ISouvenir } from "@/type/souvenir/ISouvenir";
import { Bodies, Engine, World } from "matter-js";
import { RefObject } from "react";

export const addItem = (
  engineRef: RefObject<Engine | null>,
  setCurrentFruitAndBody: (fruit: ISouvenir, body: Matter.Body) => void
) => {
  if (!engineRef.current) return;
  const engine = engineRef.current;
  if (!engine) return; // engine이 없으면 함수를 빠져나옴

  const index = Math.floor(Math.random() * 6);
  //const index = 11;
  const fruit = ITEM_BASE[index];
  const body = Bodies.circle(200, 70, fruit.radius, {
    index: index,
    isSleeping: true,
    render: {
      sprite: { texture: `${fruit.name}.png`, xScale: 1, yScale: 1 },
    },
    restitution: 0.2,
  } as ICustomBodyDefinition);

  setCurrentFruitAndBody(fruit, body);
  World.add(engine.world, body);
};
