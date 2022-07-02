import TextFieldMUI from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const TextField = ({
  className,
  label,
  value,
  name,
  icon,
  small,
  disabled,
  error,
  helperText,
  type,
  onChange,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // const variant = 'standard'
  const variant = "outlined";
  // const variant = 'filled'

  if (type === "password") {
    return (
      <TextFieldMUI
        fullWidth
        className={className}
        variant={variant}
        label={label}
        name={name}
        disabled={disabled}
        error={error}
        helperText={helperText || " "}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  return (
    <TextFieldMUI
      fullWidth
      className={className}
      variant={variant}
      label={label}
      name={name}
      disabled={disabled}
      error={error}
      helperText={helperText || !small && " "}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size={small ? 'small' : 'medium'}
      InputProps={icon && {
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};

export default TextField;
