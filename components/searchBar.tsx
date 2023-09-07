import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import styles from '../styles/Summonerpage.module.css';
import Backdrop from '@mui/material/Backdrop';
import { useBackdropContext } from './BackdropContext';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

const SearchBar = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = React.useState('');
  const { openBackdrop, closeBackdrop, backdropOpen } = useBackdropContext();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    openBackdrop();
    setOpen(true);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // handle search logic here
  };

  const handleShortcut = (event) => {
    if ((event.metaKey && event.key === 'k') || (event.ctrlKey && event.key === 'k')) {
      event.preventDefault();
      handleOpen();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  const CustomBox = styled(Box)(({ theme }) => ({
    // backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(243, 246, 249,0.8)',
    border: '1px solid rgba(218, 226, 237,0.8)',
    // boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',

    [theme.getColorSchemeSelector('dark')]: {
      // backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.cbox,
      border: "1px solid rgba(39, 37, 53, 0.8)",
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));

  const CustomBox2 = styled(Box)(({ theme }) => ({
    // backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(243, 246, 249,0.8)',
    border: '1px solid rgba(218, 226, 237,0.8)',
    // boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',

    [theme.getColorSchemeSelector('dark')]: {
      // backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.cbox,
      border: "1px solid rgba(39, 37, 53, 0.8)"
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));

  return (
    <div>
    <form onSubmit={handleSearch}>
      <CustomBox
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        //   backgroundColor: "rgba(243, 246, 249,0.8)",
        }}
        className={styles.searchBarStyle}
onClick={handleOpen}
      >
        <SearchIcon
          sx={{
            position: 'absolute',
            left: theme.spacing(1),
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          color="info"
        />
        <InputBase
         className={styles.searchBarInput}
          placeholder="Search…"
          disabled={true}
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(1),
    
            flexGrow: 1,
          }}
        />
        <CustomBox2
            
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
    
            height: theme.spacing(2.8),
            color: theme.vars.palette.text.secondary,
            backgroundColor: styles.darkModePaper,
          }}
          className={styles.searchBarCommand}
        >
          <span style={{ fontSize: 11 }}>⌘K</span>
        </CustomBox2>
      </CustomBox>
    </form>




</div>
  );
};

export default SearchBar;
