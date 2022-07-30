import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import theme from "../src/theme";
import "../src/globalStyle.css";
import MyAppBar from "../src/MyAppBar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <MyAppBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
