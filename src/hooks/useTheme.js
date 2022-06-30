import { createTheme } from "@mui/material/styles";
import { colors } from "@/common/constants";

const useTheme = () => {
  return createTheme({
    palette: {
      type: "light",
      primary: {
        main: colors.light.primary,
      },
      secondary: {
        main: colors.light.secondary,
      },
      error: {
        main: colors.light.error,
      },
      warning: {
        main: colors.light.warning,
      },
      success: {
        main: colors.light.success,
      },
    },
  });
};

export default useTheme;
