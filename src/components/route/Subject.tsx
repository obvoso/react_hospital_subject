import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { customRouteState } from "@/atoms/route/custom";
import { subjectState } from "@/atoms/route/game";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface SubjectProps {
  level: number;
  setSubjectInit: () => void;
}

export default function Subject({ level, setSubjectInit }: SubjectProps) {
  const customRoute = useRecoilValue(customRouteState);
  const config = level < 11 ? routeGameConfigList[level] : customRoute;
  const fullSubject = config.subject;
  const [subject, setSubject] = useRecoilState(subjectState);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSubject("");
  }, []);

  useEffect(() => {
    if (index < fullSubject.length) {
      const timer = setTimeout(() => {
        setSubject((prev) => prev + fullSubject.charAt(index));
        setIndex(index + 1);
      }, 70);

      return () => clearTimeout(timer);
    } else {
      // 서브젝트 렌더링 0.5초 후에 버스 출발
      const timer = setTimeout(() => {
        setSubjectInit();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [index, fullSubject]);

  return (
    <div className="flex items-center justify-center bg-whilte border-2 border-gray-500 rounded-md shadow-lg w-[500px] h-[100px] bg-contain">
      <span className="flex whitespace-pre-line leading-7 text-center">
        {subject}
      </span>
    </div>
  );
}
