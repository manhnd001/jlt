"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../state/store";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D7263D",
    },
    secondary: {
      main: "#0072E3",
    },
    background: {
      default: "#fdf8f5",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
});

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
