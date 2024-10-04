import React, { useState } from "react";
import { SketchPicker } from "react-color";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ColorPickerDialogProps {
  open: boolean;
  onClose: (color?: string) => void;
  initialColor?: string;
}

const ColorPickerDialog: React.FC<ColorPickerDialogProps> = ({
  open,
  onClose,
  initialColor = "#ffffff",
}) => {
  const [color, setColor] = useState(initialColor);

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Choose a Color</DialogTitle>
      <DialogContent>
        <SketchPicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onClose(color)} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPickerDialog;
