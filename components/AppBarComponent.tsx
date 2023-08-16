import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/Summonerpage.module.css';
// Assuming the 'PaletteMode' type is defined in 'config/types.ts'
import { PaletteMode } from '../config/types';
import { useTheme } from '@mui/material/styles';
import { block } from 'million/react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system'; // Import the styled function from MUI
interface AppBarComponentProps {
  toggleTheme: () => void;
  mode: PaletteMode; // Add the 'mode' prop here
}
const SearchInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f1f1f1',
  borderRadius: 20,
  paddingLeft: 20,
  paddingRight: 20,
  height: 32,
  color: theme.palette.mode === 'dark' ? '#fff' : '#333',
  width: '100%',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#f5f5f5',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 18,
    marginRight: 8,
    color: theme.palette.mode === 'dark' ? '#bbb' : '#666',
  },
}));


const AppBarComponent: React.FC<AppBarComponentProps> = ({ toggleTheme, mode }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

  return (
    <AppBar 
        elevation={0} 
        color="primary" 
        className={styles.appBarStyle} 
        position="fixed" 
        style={{

            boxShadow: isDarkMode ? '0 0 10px rgba(0, 0, 0, 0.2)' : '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',
            /* Add other styles here based on the theme mode */
          }}
    >
        <Toolbar>
   
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography> */}

      {mode === 'light' ?(
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
      )}

      </Toolbar>
    </AppBar>
  );
};

const AppBarComponentBlock = block(AppBarComponent)

export default AppBarComponent;
