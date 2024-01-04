import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";

interface Props {
  downPressed: boolean;
  children: React.ReactNode;
  checkForMatchAndScore: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function KeyDownButton({
  downPressed,
  children,
  checkForMatchAndScore,
}: Props) {
  const [clicked, setClicked] = useState(false);

  const handleMouseDown = () => {
    setClicked(true);
  };

  const handleMouseUp = () => {
    setClicked(false);
  };

  return (
    <div className="mx-4">
      <IconButton
        sx={{
          color: downPressed || clicked ? "#2196f3" : "#64b5f6",
          transform: downPressed || clicked ? "scale(1.5)" : "scale(2)",
          transition: "transform 0.2s",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={checkForMatchAndScore}
      >
        {children}
      </IconButton>
    </div>
  );
}
