import React, { useEffect, useState } from "react";
import useCustomRoute from "@/hooks/route/useCustomRoute";
import Route from "@/components/route/Index";

export default function CustomRoutePage() {
  const level = useCustomRoute();
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

  if (level === -1) return null;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center top",
      }}
    >
      <Route level={level} key={level} />
    </div>
  );
}
