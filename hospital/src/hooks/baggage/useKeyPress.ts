import { useState, useEffect } from "react";

export const useKeyPress = (targetKeys: string[]): boolean[] => {
  const [keysPressed, setKeysPressed] = useState<boolean[]>(
    new Array(targetKeys.length).fill(false)
  );

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      const index = targetKeys.indexOf(key);
      if (index >= 0) {
        setKeysPressed((prev) =>
          prev.map((val, i) => (i === index ? true : val))
        );
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      const index = targetKeys.indexOf(key);
      if (index >= 0) {
        setKeysPressed((prev) =>
          prev.map((val, i) => (i === index ? false : val))
        );
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keysPressed;
};
