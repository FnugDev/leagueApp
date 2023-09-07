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
// const getDesignTokens = (mode: PaletteMode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//           // palette values for light mode
//           divider: grey[300],
//           drawer: '#000000',
//           custom: {
//             main: grey[900],
//           },
//           success: {
//             main: '#44b700',
//           },
//           primary: {
//             main: '#f4f7ff',
//           },
//           warning: {
//             main: grey[500],
//           },
//           text: {
//             primary: "#424955FF",
//             secondary: grey[800],
//           },
//           background: {
//             default: '#f4f7ff',
//             paper: '#f4f7ff',
//             drawer: '#000000',
//           },
//         }
//       : {
//           // palette values for dark mode
//           drawer: '#000000',
//           divider: '#000000',
//           success: {
//             main: '#44b700',
//           },
//           custom: {
//             main: grey[100],
//           },
//           warning: {
//             main: grey[500],
//           },
//           background: {
//             default: '#0e1129',
//             paper: '#0e1129',
//             drawer: '#000000',
//           },
//           text: {
//             primary: '#ffffff',
//             secondary: '#ffffff',
//           },
//         }),
//   },
// });

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}


// pages/_app.tsx
// ... (previous imports)

// ... (previous code)
const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
};
export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // const [mode, setMode] = React.useState<PaletteMode>('light');

  // React.useEffect(() => {
  //   // Check if the user's system prefers dark mode
  //   const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   // Retrieve the mode preference from local storage if it exists
  //   const savedMode = localStorage.getItem('darkMode');

  //   if (savedMode) {
  //     setMode(savedMode as PaletteMode);
  //   } else if (prefersDarkMode) {
  //     setMode('dark');
  //   } else {
  //     setMode('light');
  //   }
  // }, []);

  // const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // const toggleTheme = () => {
  //   const newMode = mode === 'light' ? 'dark' : 'light';
  //   setMode(newMode);
  //   localStorage.setItem('darkMode', newMode); // Save the new mode preference to local storage
  // };

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