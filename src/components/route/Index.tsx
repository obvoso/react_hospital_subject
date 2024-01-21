import React from "react";

interface RouteProps {
  level: number;
}

export default function Route({ level }: RouteProps) {
  return <div>{level}</div>;
}
