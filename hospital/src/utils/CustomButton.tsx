import React from "react";
import { Button } from "@mui/material";

interface Props {
  text: string;
  onClick: () => void;
  type: "ready" | "next" | "done";
}

export default function CustomButton({ text, onClick, type }: Props) {
  const styles = {
    ready:
      "text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-600",
    done: "text-white font-bold py-2 px-4 rounded bg-gray-400 cursor-not-allowed",
    next: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
  };
  const btnStyle =
    type === "ready"
      ? styles.ready
      : type === "done"
      ? styles.done
      : styles.next;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={btnStyle}
      disabled={type == "done"}
    >
      {text}
    </Button>
  );
}
