import { createTheme } from "@mui/material/styles";

const useTheme = () => {
  return createTheme({
    palette: {
      type: "light",
      primary: {
        main: "rgba(13,59,201,0.87)",
      },
      secondary: {
        main: "#F64C72",
      },
      error: {
        main: "#d50102",
      },
      warning: {
        main: "#d50102",
      },
      success: {
        main: "#99738E",
      },
    },
  });
};

export default useTheme;
