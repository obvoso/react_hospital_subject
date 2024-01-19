import React from "react";
import { Button } from "@mui/material";

interface Props {
  text: string;
  onClick: () => void;
  type: "activate" | "disabled";
}

export default function CustomButton({ text, onClick, type }: Props) {
  const styles = {
    activate:
      "text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 whitespace-nowrap",
    disabled:
      "text-white font-bold py-2 px-4 rounded bg-gray-400 cursor-not-allowed whitespace-nowrap",
  };
  const btnStyle = type === "activate" ? styles.activate : styles.disabled;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      className={btnStyle}
      disabled={type == "disabled"}
    >
      {text}
    </Button>
  );
}
