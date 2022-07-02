import React from "react";
import MUIButton from "@mui/material/Button";
// import { SxProps } from '@mui/system'
import "./style.scss";

const Button = ({
  children,
  className,
  secondary,
  success,
  startIcon,
  contained,
  fullWidth,
  small,
  rounded,
  disabled,
  text,
  type,
  sx,
  onClick,
}) => {
  const classes = ["button"];

  if (rounded) classes.push("button_rounded");
  if (text) classes.push("button_text");
  if (className) classes.push(className);

  const size = () => {
    if (small) return "small";
    return "medium";
  };

  const btnColor = () => {
    if (secondary) return "secondary";
    if (success) return "success";
    return "primary";
  };

  return (
    <MUIButton
      className={classes.join(" ")}
      color={btnColor()}
      variant={contained ? "contained" : "outlined"}
      disabled={disabled}
      startIcon={startIcon}
      fullWidth={fullWidth}
      size={size()}
      type={type}
      sx={sx}
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
