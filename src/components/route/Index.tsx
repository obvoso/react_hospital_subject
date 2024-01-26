import { useState } from "react";
import { useRandomMark } from "@/hooks/route/useRamdomMark";
import { useGrid } from "@/hooks/route/useGrid";
import Subject from "./Subject";
import GameContolButton from "./GameControlButton";
import LevelNav from "@/utils/LevelNav";
import DrawMarkAndCanvas from "./DrawMarkAndCanvas";

interface RouteProps {
  level: number;
}

export default function Route({ level }: RouteProps) {
  const { gridInitFlag } = useGrid(level);
  const { mark } = useRandomMark({ level, gridInitFlag });
  const [subjectInitFlag, setSubjectInitFlag] = useState(false);
  if (!gridInitFlag || !mark.length) {
    return null;
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-center items-center py-4 gap-x-10">
      <div className="flex flex-col items-center justify-center p-10 gap-y-14">
        <Subject
          level={level}
          setSubjectInit={() => setSubjectInitFlag(true)}
          key={mark[0].x + mark[1].x - mark[0].y + level}
        />
        <DrawMarkAndCanvas
          level={level}
          mark={mark}
          subjectInitFlag={subjectInitFlag}
        />
        <GameContolButton />
      </div>
      <LevelNav game="route" curLevel={level} />
    </div>
  );
}
