import { routeGameConfigList } from "@/assets/route/routeGameConfig";
import { subjectState } from "@/atoms/route/game";
import React, { useState, useEffect, use } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface SubjectProps {
  level: number;
  setSubjectInit: () => void;
}

export default function Subject({ level, setSubjectInit }: SubjectProps) {
  const config = routeGameConfigList[level];
  const [subject, setSubject] = useRecoilState(subjectState);

  useEffect(() => {
    if (config) {
      setSubject({ fullSubject: config.subject, typing: "", index: 0 });
    } else {
      setSubject({
        fullSubject: "커스텀 경로 기억하기 페이지입니다.",
        typing: "커스텀 경로 기억하기 페이지입니다.",
        index: 19,
      });
    }
  }, [level]);

  useEffect(() => {
    if (subject.index < subject.fullSubject.length + 1) {
      const timer = setTimeout(() => {
        setSubject({
          ...subject,
          typing: subject.typing + subject.fullSubject.charAt(subject.index),
          index: subject.index + 1,
        });
      }, 70);
      return () => clearTimeout(timer);
    } else {
      // 서브젝트 렌더링 0.5초 후에 버스 출발
      const timer = setTimeout(() => {
        setSubjectInit();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [subject.index, subject.fullSubject]);

  return (
    <div className="flex items-center justify-center bg-whilte border-2 border-gray-500 rounded-md shadow-lg w-[500px] h-[100px] bg-contain">
      <span className="flex whitespace-pre-line leading-7 text-center">
        {subject.typing}
      </span>
    </div>
  );
}
