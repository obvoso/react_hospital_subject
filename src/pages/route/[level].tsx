import Route from "@/components/route/Index";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

export default function RoutePage() {
  const router = useRouter();
  const { level } = router.query;

  if (level === undefined || isNaN(Number(level))) {
    return <div>Invalid level</div>;
  }

  return (
    <div>
      <Route level={Number(level)} />
    </div>
  );
}
