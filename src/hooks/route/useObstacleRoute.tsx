import { useEffect } from "react";
import shuffleArray from "@/utils/arrayShuffle";
import { Mark } from "@/type/route/Mark";
import { useSetRecoilState } from "recoil";
import { subjectState } from "@/atoms/route/game";

interface params {
  mark: Mark[];
  setCurrentRoute: React.Dispatch<React.SetStateAction<Mark[]>>;
  otherRoute: Mark[];
  setOtherRoute: React.Dispatch<React.SetStateAction<Mark[]>>;
  animationDone: boolean;
  setAnimationStop: React.Dispatch<React.SetStateAction<boolean>>;
  config: any;
}

export default function useObstacleRoute({
  mark,
  setCurrentRoute,
  otherRoute,
  setOtherRoute,
  animationDone,
  setAnimationStop,
  config,
}: params) {
  const setSubject = useSetRecoilState(subjectState);

  function arraysHaveSameSequence(arr1: Mark[], arr2: Mark[]) {
    return arr1.every((item, index) => item.image === arr2[index].image);
  }

  // 첫번째 경로 할당
  useEffect(() => {
    setCurrentRoute(mark);
  }, [mark]);

  // 두번째 경로 할당
  useEffect(() => {
    function setSecondRoute() {
      if (config.obstacle && !otherRoute.length && animationDone) {
        let newRoute: Mark[];
        do {
          const copyArr = mark.slice(0, -1);
          newRoute = shuffleArray(copyArr).map((item, index) => ({
            ...item,
            priority: index,
          }));

          let randomIndex = Math.floor(Math.random() * (newRoute.length - 2));
          newRoute.push({
            ...newRoute[randomIndex],
            priority: newRoute.length,
          });
        } while (arraysHaveSameSequence(newRoute, mark));

        const timer = setTimeout(() => {
          setOtherRoute(newRoute);
          setCurrentRoute(newRoute);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
    setSecondRoute();
  }, [animationDone, config.obstacle, mark, otherRoute.length]);

  // 세번째 경로 할당(정답)
  useEffect(() => {
    // 왜 animationDone이 true가 먼저 찍히고 다시 false가 되는지 모르겠음..
    if (config.obstacle && otherRoute.length && !animationDone) {
      return () => {
        const random = Math.floor(Math.random() * 2);
        const vehicle = random ? "버스" : "택시";
        setCurrentRoute(random ? mark : otherRoute);
        setSubject(vehicle + "가 이동하였던 경로 순서 여행지를 눌러주세요.");
        setAnimationStop(true);
      };
    }
  }, [animationDone, otherRoute]);
}
