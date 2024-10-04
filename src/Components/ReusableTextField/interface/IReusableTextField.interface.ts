// types/IReusableTextField.interface.ts
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ISelect } from "../../../Shared/Interface/ISelect.interface";

export interface IReusableTextField<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>; // Dynamic key based on the provided type
  label: string;
  error?: boolean;
  helperText?: string;
  value: string | number; // TextField expects a string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  borderRadius?: string;
  select?: boolean;
  options?: ISelect[];
  type?: string;
  isColorPicker?: boolean;
  disabled?: boolean; 
}
