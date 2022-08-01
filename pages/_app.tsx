import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import theme from "../src/theme";
import "../src/globalStyle.css";
import MyAppBar from "../src/MyAppBar";
import { EmotionCache, CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import Head from "next/head";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyAppBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
