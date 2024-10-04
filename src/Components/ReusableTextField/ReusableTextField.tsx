import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";
import { IReusableTextField } from "./interface/IReusableTextField.interface";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import ColorPickerDialog from "../ColorPicker/ColorPicker";
import ColorIndicator from "../ColorPicker/ColorIndicator";

const ReusableTextField = <T extends FieldValues>({
  register,
  name,
  label,
  error,
  helperText,
  value,
  onChange,
  fullWidth = true,
  borderRadius = "10px",
  options,
  select = false,
  type,
  isColorPicker = false,
  disabled = false, // Add disabled prop with default value
}: IReusableTextField<T>) => {
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const handleColorChange = (selectedColor?: string) => {
    if (selectedColor) {
      onChange({
        target: { value: selectedColor },
      } as React.ChangeEvent<HTMLInputElement>); // Cast directly when passing
    }
    setOpenColorPicker(false);
  };
  return (
    <>
      <TextField
        autoComplete="off"
        type={type}
        select={select}
        {...register(name)} // Register the input using the dynamic field name
        fullWidth={fullWidth}
        label={label}
        variant="outlined"
        error={!!error}
        helperText={helperText}
        value={value}
        onChange={onChange}
        onClick={isColorPicker ? () => setOpenColorPicker(true) : undefined}
        sx={{ mb: 2 }}
        InputProps={{
          sx: {
            borderRadius: borderRadius,
          },
          startAdornment: isColorPicker ? (
            <InputAdornment position="start">
              <ColorIndicator color={value as string} isColorPicked={!!value} />
            </InputAdornment>
          ) : undefined,
          readOnly: isColorPicker,
        }}
        slotProps={
          type === "date" || isColorPicker
            ? {
              inputLabel: {
                shrink: !!value || openColorPicker || type === "date", // Ensure label is always visible when type is 'date'
              },
            }
            : undefined
        }
        disabled={disabled} // Disable the text field if disabled is true
      >
        {options?.map((option) => (
          <MenuItem key={option.Value} value={option.Value}>
            <Box display="flex" alignItems="center">
              {option.Icon && (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center", marginRight: 2 }} // Adjust margin as needed
                >
                  {option.Icon} {/* Add the icon before the label */}
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {option.Label}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </TextField>
      {openColorPicker && (
        <ColorPickerDialog
          open={openColorPicker}
          onClose={handleColorChange}
          initialColor={typeof value === "string" ? value : String(value)}
        />
      )}
    </>
  );
};

export default ReusableTextField;
