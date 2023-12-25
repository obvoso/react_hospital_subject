// pages/game.tsx
import { BaggageCanvas } from "@/components/baggage";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function GamePage() {
  const [score, setScore] = useState(0);
  const router = useRouter();
  const { level } = router.query;
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Game over logic
  useEffect(() => {
    if (timeLeft === 0) {
      // End the game
    }
  }, [timeLeft]);

  return (
    <div>
      <BaggageCanvas score={score} setScore={setScore} />
      <div>Score: {score}</div>
      <div>Time left: {timeLeft}</div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { level: "practice-1" } },
      { params: { level: "0" } },
      { params: { level: "1" } },
      { params: { level: "2" } },
      { params: { level: "3" } },
      { params: { level: "4" } },
      { params: { level: "5" } },
      { params: { level: "6" } },
      { params: { level: "7" } },
      { params: { level: "8" } },
      { params: { level: "9" } },
      { params: { level: "10" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { level: string };
}) {
  // Fetch data for the blog post using params.level
  return {
    props: {
      // Your props here
    },
  };
}
