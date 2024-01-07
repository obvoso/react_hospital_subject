import { whackAmoleConfigState } from "@/atoms/whackAmole/config";
import Canvas from "@/components/whackAmole/Canvas";
import { whackAmoleGameConfig } from "@/utils/whackAmole/whackAmoleGameConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function GamePage() {
  const router = useRouter();
  const level = Number(router.query.level);
  const [config, setConfig] = useRecoilState(whackAmoleConfigState);

  useEffect(() => {
    const levelConfig = whackAmoleGameConfig[level];
    setConfig(levelConfig);
  }, [level]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>GamePage</h1>
      <Canvas key={level} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const paths = whackAmoleGameConfig.map((level) => ({
    params: { level: level.level.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { level: string };
}) => {
  const levelConfig = whackAmoleGameConfig.find(
    (level) => level.level.toString() === params.level
  );

  if (!levelConfig) {
    return { notFound: true };
  }

  return {
    props: {
      levelConfig,
    },
  };
};
