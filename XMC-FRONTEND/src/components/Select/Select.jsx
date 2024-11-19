import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputBase,
} from "@mui/material";

const SelectComponent = ({
  value,
  onChange,
  options,
  label,
  size = "small",
  placeholder = "Select",
  sx = {},
  ...props
}) => {
  return (
    <FormControl fullWidth size={size} sx={{ ...sx }}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        input={<InputBase />}
        sx={{
          borderRadius: "10px",
          backgroundColor: "#e9e9e9",
          height: "40px",
          fontSize: "0.875rem",
          border: "none",
          padding: "0 12px",
          mt: 2,
          "&:hover": {
            backgroundColor: "#dcdcdc",
            border: "none",
          },
          "&.Mui-focused": {
            backgroundColor: "#e9e9e9",
            boxShadow: "none",
            border: "none",
          },
          ".MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
          },
          ...sx,
        }}
        {...props}
      >
        {options.length === 0 && <MenuItem value="">{placeholder}</MenuItem>}
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.icon && option.icon} {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
