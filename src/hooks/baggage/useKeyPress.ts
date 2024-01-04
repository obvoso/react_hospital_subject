import { useState, useEffect } from "react";

export const useKeyPress = (targetKeys: string[]): boolean[] => {
  const [keysPressed, setKeysPressed] = useState<boolean[]>(
    targetKeys.map(() => false)
  );

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      const index = targetKeys.indexOf(key);
      if (index > -1) {
        setKeysPressed((prevKeys) =>
          prevKeys.map((pressed, i) => (i === index ? true : pressed))
        );
      }
    };

    const upHandler = ({ key }: KeyboardEvent) => {
      const index = targetKeys.indexOf(key);
      if (index > -1) {
        setKeysPressed((prevKeys) =>
          prevKeys.map((pressed, i) => (i === index ? false : pressed))
        );
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKeys]);

  return keysPressed;
};
