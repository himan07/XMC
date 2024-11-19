import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ register, errors, onKeyDown, ...props }) => (
  <TextField
    fullWidth
    size="small"
    error={!!errors}
    helperText={
      errors ? <span style={{ color: "#d32f2f" }}>{errors.message}</span> : ""
    }
    onKeyDown={onKeyDown}
    {...register}
    {...props}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        backgroundColor: "#e9e9e9",
        border: "none",
        mt: 2, // margin-top for space from top
        height: "40px", // Set a specific height for the input (you can adjust this)
        display: "flex",
        alignItems: "center", // Vertically center the label and input text
        "&:hover": {
          backgroundColor: "#dcdcdc",
        },
        "&.Mui-focused": {
          backgroundColor: "#e9e9e9",
          boxShadow: "none",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#6e6e6e",
        textAlign: "center",
        lineHeight: "55px",
        "&.Mui-focused": {
          color: "#6e6e6e",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiFormHelperText-root": {
        textAlign: "left",
        margin: 0,
        padding: 0,
      },
    }}
  />
);

export default InputField;
