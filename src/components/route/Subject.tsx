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
  const [fullSubject, setFullSubject] = useRecoilState(subjectState);
  const [typing, setTyping] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (config) {
      setFullSubject(config.subject);
    } else {
      setFullSubject("커스텀 경로 기억하기 페이지입니다.");
    }
    setTyping("");
  }, [level]);

  useEffect(() => {
    setIndex(0);
    setTyping("");
  }, [fullSubject]);

  useEffect(() => {
    if (index < fullSubject.length + 1) {
      const timer = setTimeout(() => {
        setTyping((prev) => prev + fullSubject.charAt(index));
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
        {typing}
      </span>
    </div>
  );
}
