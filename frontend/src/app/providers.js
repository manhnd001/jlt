"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e53935",
    },
    secondary: {
      main: "#3949ab",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
});

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
