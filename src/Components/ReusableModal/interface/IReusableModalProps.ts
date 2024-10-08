import { DialogProps } from "@mui/material";
import { ReactNode } from "react";
import Mode from "../Enum/enum";

interface IReusableModalProps extends DialogProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave?: () => void;
  mode?: Mode;
  disable?: boolean;
  open: boolean;
  md?: number;
  sm?: number;
  xs?: number;
  xl?: number;
}

export default IReusableModalProps;
