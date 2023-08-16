// config/types.ts
export type PaletteMode = 'light' | 'dark';



export interface ThemeOptions {
    palette: {
      mode?: PaletteMode;
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 8px rgba(250, 250, 250, 1.0)',
          },
        },
      },
    },
    darkMode: {
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)', // Dark box shadow color
            },
          },
        },
      },
    },
  };
 
  
  