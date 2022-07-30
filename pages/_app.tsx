import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import theme from "../src/theme";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CODE Forum
            </Typography>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
