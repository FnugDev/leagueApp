// pages/_app.tsx
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles';
import { NoSsr } from '@mui/base/NoSsr';
import CssBaseline from '@mui/material/CssBaseline';
import { ScopedCssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import AppBarComponent from '../components/AppBarComponent';
import { BackdropProvider } from '../components/BackdropContext'; // Make sure to use curly braces {}
import createEmotionCache from '../config/createEmotionCache';
import { PaletteMode, ThemeOptions } from '../config/types';
import { amber, grey, deepOrange } from '@mui/material/colors';
// pages/_app.js
import Container from '@mui/material/Container';
import '../styles/scrollbar.css';
import '../styles/globals.css';


import Button from '@mui/material/Button';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    sidemenu: string;
    cbox: string;
    appbar: {
      background: string;
      shadow: string;
    };
  }
  interface Palette {
    sidemenu: string;
    cbox: string;
    appbar: {
      background: string;
      shadow: string;
    };
  }
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          divider: grey[300],
          sidemenu: "#eaeffc",
          cbox: "#fbfcff",
          appbar: {
            background: "rgba(240, 244, 254, 0.4)",
            shadow: "string",
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
            secondary: "#424955FF",
          },
          background: {
            default: '#f4f7ff',
            paper: '#f4f7ff',

          },
        },
      },
      dark: {
        palette: {
          sidemenu: "#0e1129",
          cbox: "#0e1129",
          appbar: {
            background: "rgba(14, 17, 41, 0.8)",
            shadow: "string",
          },
          divider: '#000000',
          success: {
            main: '#44b700',
          },

          warning: {
            main: grey[500],
          },
          background: {
            default: '#0e1129',
            paper: '#0e1129',
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgb(176, 184, 196)',
          },
        },
      },
    },
    // ...other properties
});

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}


export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (

    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssVarsProvider theme={theme}>
        {/* <ScopedCssBaseline enableColorScheme> */}
        <CssBaseline />
        <BackdropProvider>
        {/* <ModeSwitcher /> */}
        <AppBarComponent  />
        
          <Component {...pageProps} />
        </BackdropProvider>

        {/* </ScopedCssBaseline> */}
      </CssVarsProvider>
    </CacheProvider>


  );
}