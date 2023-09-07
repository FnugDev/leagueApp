import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/Summonerpage.module.css';

import SearchBar from './searchBar';
import { PaletteMode } from '../config/types';
import { useTheme } from '@mui/material/styles';
import { block } from 'million/react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import Cookies from 'js-cookie';

interface AppBarComponentProps {
  toggleTheme: () => void;
  mode: PaletteMode; // Add the 'mode' prop here
}

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
    color="inherit"
      startIcon={mode === 'light' ? <LightModeIcon /> : <NightsStayIcon />}
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      <Typography className={styles.darkModeText} component="div" sx={{ flexGrow: 1 }}>
        {mode === 'light' ? 'Light' : 'Dark'}
      </Typography>
    </Button>
  );
};


const AppBarComponent = ({  }) => {
  const { mode, setMode } = useColorScheme();

  const CustomAppBar = styled(AppBar)(({ theme }) => ({
    backdropFilter: 'blur(7px)',
    backgroundColor: theme.vars.palette.appbar.background,
    boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',

    [theme.getColorSchemeSelector('dark')]: {
      backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.appbar.background,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));

  return (
    <CustomAppBar 
        elevation={0} 
        color="primary" 
        className={styles.appBarStyle} 
        position="fixed" 
        title='hello'

    >
        <Toolbar>
   
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography> */}

      {/* {mode === 'light' ?(
        <Button color="inherit" onClick={toggleTheme} size="small" startIcon={<LightModeIcon />}>
          <Typography className={styles.darkModeText} component="div" sx={{ flexGrow: 1 }}>
            {mode}
          </Typography>
        </Button>
      ) : (
        <Button color="inherit" onClick={toggleTheme} size="small" startIcon={<NightsStayIcon />}>
          <Typography className={styles.darkModeText} component="div" sx={{ flexGrow: 1 }}>
            {mode}
          </Typography>
        </Button>
      )} */}
<ModeSwitcher/>
<div style={{ flexGrow: 0.8 }} />

      <SearchBar/>




      </Toolbar>
    </CustomAppBar>
  );
};

const AppBarComponentBlock = block(AppBarComponent)

export default AppBarComponent;
