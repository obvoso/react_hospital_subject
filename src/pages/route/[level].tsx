import React from "react";
import Route from "@/components/route/Index";
import { useRouter } from "next/router";

export default function RoutePage() {
  const router = useRouter();
  const { level } = router.query;

  if (level === undefined || isNaN(Number(level))) {
    return <div>Invalid level</div>;
  }

  return (
    <div>
      <Route level={Number(level)} key={Number(level)} />
    </div>
  );
}
