import React, { useEffect, useState } from "react";
import Route from "@/components/route/Index";
import { useRouter } from "next/router";

export default function RoutePage() {
  const router = useRouter();
  const { level } = router.query;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 550) {
        setScale(0.7);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  if (level === undefined || isNaN(Number(level))) {
    return <div>Invalid level</div>;
  }

  return (
    <>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center top",
        }}
      >
        <Route level={Number(level)} key={Number(level)} />
      </div>
    </>
  );
}
