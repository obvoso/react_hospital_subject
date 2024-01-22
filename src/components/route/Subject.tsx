import { RouteGameConfigList } from "@/assets/route/routeGameConfig";
import React, { useState, useEffect } from "react";

interface SubjectProps {
  level: number;
  setSubjectInit: () => void;
}

export default function Subject({ level, setSubjectInit }: SubjectProps) {
  const config = RouteGameConfigList[level];
  const fullSubject = config.subject;
  const [subject, setSubject] = useState<string>("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullSubject.length) {
      const timer = setTimeout(() => {
        setSubject((prev) => prev + fullSubject.charAt(index));
        setIndex(index + 1);
      }, 70);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setSubjectInit();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [index, fullSubject]);

  return (
    <div className="flex items-center justify-center bg-whilte border-2 border-gray-500 rounded-md shadow-lg w-[400px] h-[120px] bg-contain">
      <span className="flex whitespace-pre-line leading-8 text-center">
        {subject}
      </span>
    </div>
  );
}
