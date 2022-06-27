import React from "react";
import MUIButton from "@mui/material/Button";
// import { SxProps } from '@mui/system'
import "./style.scss";

const Button = ({
  children,
  className,
  fullWidth,
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

  return (
    <MUIButton
      className={classes.join(" ")}
      variant="outlined"
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
      sx={sx}
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
