import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "@/store";
import App from "./App";
import "@/assets/main.scss";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
