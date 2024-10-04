import { Box } from "@mui/material";

interface ColorCircleProps {
  color: string;
  isColorPicked: boolean;
}

const ColorIndicator: React.FC<ColorCircleProps> = ({
  color,
  isColorPicked,
}) => {
  return (
    <Box
      sx={{
        display: isColorPicked ? "block" : "none",
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: color || "#ffffff", // Default to white if no color
        border: "1px solid #ccc",
        marginRight: 1,
      }}
    />
  );
};

export default ColorIndicator;
