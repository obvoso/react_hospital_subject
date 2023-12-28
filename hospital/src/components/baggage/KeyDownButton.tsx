import { IconButton } from "@mui/material";

interface Props {
  downPressed: boolean;
  children: React.ReactNode;
}

export default function KeyDownButton({ downPressed, children }: Props) {
  return (
    <IconButton
      sx={{
        color: downPressed ? "#2196f3" : "#64b5f6",
        transform: downPressed ? "scale(1.5)" : "scale(2)",
        transition: "transform 0.2s",
      }}
      className="mx-4"
    >
      {children}
    </IconButton>
  );
}
