// pages/_app.tsx
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import AppBarComponent from '../components/AppBarComponent';
import createEmotionCache from '../config/createEmotionCache';
import { PaletteMode, ThemeOptions } from '../config/types';
import { amber, grey, deepOrange } from '@mui/material/colors';
// pages/_app.js

import '../styles/scrollbar.css';




// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          divider: grey[300],
          drawer: '#000000',
          custom: {
            main: grey[900],
          },
          success: {
            main: '#44b700',
          },
          primary: {
            main: '#f4f7ff',
          },
          warning: {
            main: grey[500],
          },
          text: {
            primary: "#424955FF",
            secondary: grey[800],
          },
          background: {
            default: '#f4f7ff',
            paper: '#f4f7ff',
            drawer: '#000000',
          },
        }
      : {
          // palette values for dark mode
          drawer: '#000000',
          divider: '#000000',
          success: {
            main: '#44b700',
          },
          custom: {
            main: grey[100],
          },
          warning: {
            main: grey[500],
          },
          background: {
            default: '#0e1129',
            paper: '#0e1129',
            drawer: '#000000',
          },
          text: {
            primary: '#ffffff',
            secondary: '#ffffff',
          },
        }),
  },
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// pages/_app.tsx
// ... (previous imports)

// ... (previous code)

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = React.useState<PaletteMode>('light');

  React.useEffect(() => {
    // Check if the user's system prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Retrieve the mode preference from local storage if it exists
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode) {
      setMode(savedMode as PaletteMode);
    } else if (prefersDarkMode) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, []);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('darkMode', newMode); // Save the new mode preference to local storage
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* <ScopedCssBaseline enableColorScheme> */}
        <CssBaseline />
          <AppBarComponent toggleTheme={toggleTheme} mode={mode} />
          <Component {...pageProps} />
        {/* </ScopedCssBaseline> */}
      </ThemeProvider>
    </CacheProvider>
  );
}