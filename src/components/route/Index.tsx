import { useState } from "react";
import { useRandomMark } from "@/hooks/route/useRamdomMark";
import { useGrid } from "@/hooks/route/useGrid";
import Subject from "./Subject";
import GameContolButton from "./GameControlButton";
import LevelNav from "@/utils/LevelNav";
import DrawMarkAndCanvas from "./DrawMarkAndCanvas";
import Speed from "./Speed";

interface RouteProps {
  level: number;
}

export default function Route({ level }: RouteProps) {
  const { gridInitFlag } = useGrid(level);
  const [subjectInitFlag, setSubjectInitFlag] = useState(false);
  if (!gridInitFlag) {
    return null;
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-center items-center py-4 gap-x-10">
      <div className="flex flex-col items-center justify-center p-10 gap-y-14">
        <Subject
          level={level}
          setSubjectInit={() => setSubjectInitFlag(true)}
        />
        <DrawMarkAndCanvas
          level={level}
          subjectInitFlag={subjectInitFlag}
          gridInitFlag={gridInitFlag}
          key={level}
        />
        <GameContolButton level={level} />
      </div>
      <Speed level={level} />
      <LevelNav game="route" curLevel={level} />
    </div>
  );
}
