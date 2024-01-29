import React from "react";
import useCustomRoute from "@/hooks/route/useCustomRoute";
import Route from "@/components/route/Index";

export default function CustomRoutePage() {
  const level = useCustomRoute();
  if (level === -1) return null;

  return (
    <div>
      <Route level={level} key={level} />
    </div>
  );
}
