import { useEffect } from "react";
import shuffleArray from "@/utils/arrayShuffle";
import { Mark } from "@/type/route/Mark";
import { useRecoilState } from "recoil";
import { subjectState } from "@/atoms/route/game";
import { Direction } from "@/type/route/routeGameConfigType";
import { arraysHaveSameSequence } from "@/utils/route/arraysHaveSameSequence";

interface params {
  mark: Mark[];
  setCurrentRoute: React.Dispatch<React.SetStateAction<Mark[]>>;
  otherRoute: Mark[];
  setOtherRoute: React.Dispatch<React.SetStateAction<Mark[]>>;
  animationDone: boolean;
  setAnimationDone: React.Dispatch<React.SetStateAction<boolean>>;
  config: any;
}

export default function useObstacleRoute({
  mark,
  setCurrentRoute,
  otherRoute,
  setOtherRoute,
  animationDone,
  setAnimationDone,
  config,
}: params) {
  const [subject, setSubject] = useRecoilState(subjectState);

  // 첫번째 경로 할당
  useEffect(() => {
    if (mark.length === 0) return;
    setCurrentRoute(mark);
    setOtherRoute([]);
    setAnimationDone(false);
    if (
      config.obstacle &&
      config.level < 13 &&
      subject.fullSubject.length === 0
    ) {
      setSubject({
        fullSubject: "각 버스와 택시가 이동하는 경로를 모두 기억해주세요.",
        typing: "",
        index: 0,
      });
    } else if (
      config.obstacle &&
      (config.level >= 13 || subject.fullSubject.length !== 0)
    ) {
      setSubject({
        fullSubject: "각 버스와 택시가 이동하는 경로를 모두 기억해주세요.",
        typing: "각 버스와 택시가 이동하는 경로를 모두 기억해주세요.",
        index: 29,
      });
    }
  }, [mark]);

  // 두번째 경로 할당
  useEffect(() => {
    function getCopyArr(arr: Mark[]) {
      const copyArr = new Map();

      arr.forEach((obj) => {
        if (!copyArr.has(obj.image)) {
          copyArr.set(obj.image, obj);
        }
      });

      return Array.from(copyArr.values());
    }

    function setSecondRoute() {
      if (
        config.obstacle &&
        !otherRoute.length &&
        animationDone &&
        mark.length
      ) {
        let newRoute: Mark[];
        do {
          const copyArr = config.transit ? getCopyArr(mark) : [...mark];
          newRoute = shuffleArray(copyArr).map((item, index) => ({
            ...item,
            priority: index,
          }));
          if (config.transit) {
            let randomIndex = Math.floor(Math.random() * (newRoute.length - 1));
            newRoute.push({
              ...newRoute[randomIndex],
              priority: newRoute.length,
            });
          }
          if (config.direction === Direction.BACKWARD) {
            newRoute.reverse();
          }
        } while (arraysHaveSameSequence(newRoute, mark));
        const timer = setTimeout(() => {
          setOtherRoute(newRoute);
          setCurrentRoute(newRoute);
          setAnimationDone(false);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
    setSecondRoute();
  }, [animationDone, config.obstacle, mark, otherRoute.length]);

  // 세번째 경로 할당(정답)
  useEffect(() => {
    if (config.obstacle && otherRoute.length && animationDone) {
      const random = Math.floor(Math.random() * 2);
      const vehicle = random ? "버스" : "택시";
      setCurrentRoute(random ? mark : otherRoute);
      if (config.direction === Direction.BACKWARD)
        setSubject({
          fullSubject:
            vehicle + "가 이동하였던 경로 순서를 거꾸로 기억해서 눌러주세요.",
          typing: "",
          index: 0,
        });
      else
        setSubject({
          fullSubject: vehicle + "가 이동하였던 경로 순서 여행지를 눌러주세요.",
          typing: "",
          index: 0,
        });
    }
  }, [animationDone, otherRoute]);
}
