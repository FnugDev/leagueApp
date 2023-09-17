import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { useEffect } from "react";
import LoginAndRegister from './LoginRegistration';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import axios from 'axios';
// import styles from '../styles/Summonerpage.module.css';
import styles from '../styles/SideMenu.module.css'; 
import { block } from 'million/react';

// Add the styles for the drawer
// import './UnrankedBoxDrawer.css'; // Create this CSS file for styling the drawer

const UnrankedBox: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [isDrawerHovered, setIsDrawerHovered] = useState(false); // Add state for hover
  const [accountData, setAccountData] = useState(null); // You can also provide an initial value and specify a type

  useEffect(() => {
    const fetchLolAccount = async () => {
      try {
        const res = await axios.get('/api/getLolAccount');
        console.log('Account info:', res.data);

        // Update the state variable with the fetched data
        setAccountData(res.data);
      } catch (error) {
        console.error('Failed to fetch account:', error);
      }
    };

    fetchLolAccount();
  }, []);

  useEffect(() => {
    const auth = getAuth();

    // Check the user's login status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setShowLoginButton(!user); // If user is not logged in, show the login button
    });

    return () => {
      unsubscribe(); // Clean up the subscription when the component unmounts
    };
  }, []);


  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const login = () => {
    // window.location.href = '/api/authLogin';

      const currentUrl = window.location.href;
      window.location.href = `/api/authLogin?prevUrl=${encodeURIComponent(currentUrl)}`;
    
  };

  const logout = async () => {
    await fetch('/api/authLogout', {
      method: 'POST', // or GET
    });
  };
  const paperStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? styles.darkModePaper : '#eaeffc',

  };
  
  const CustomPaper = styled(Paper)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: theme.vars.palette.sidemenu,
    boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',
    transition: "width 0.2s ease-in-out",

    [theme.getColorSchemeSelector('dark')]: {
      backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.sidemenu,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
      transition: "width 0.2s ease-in-out",
    },
  }));
  
  return (


    <CustomPaper elevation={0} className={styles.sideMenuDrawer}
    onMouseEnter={() => setIsDrawerHovered(true)}
    onMouseLeave={() => setIsDrawerHovered(false)}
 
    >



<div className={styles.sideMenuHeader}>
<div className={styles.imageAndDividerContainer}>
    <Avatar src="../../viola.png" alt='viola' sx={{ width: 50, height: 50 }} />
    <Divider className={styles.sideMenuHeaderDivider} />
  </div>
</div>


{/* <li className={styles.MuiTimelineItem}>
  <div className={styles.MuiTimelineSeparator}>
    <span className={styles.MuiTimelineDot}></span>
    <span className={styles.MuiTimelineConnector}></span>
  </div>
  <div className={styles.MuiTypography}>Material UI</div>
</li>
<li className={styles.MuiTimelineItem}>
  <div className={styles.MuiTimelineSeparator}>
    <span className={styles.MuiTimelineDot}></span>
    <span className={styles.MuiTimelineConnector}></span>
  </div>
  <div className={styles.MuiTypography}>Material UI</div>
</li>
<li className={styles.MuiTimelineItem}>
  <div className={styles.MuiTimelineSeparator}>
    <span className={styles.MuiTimelineDot}></span>
    <span className={styles.MuiTimelineConnector}></span>
  </div>
  <div className={styles.MuiTypography}>Material UI</div>
</li> */}

{accountData ? (
  <Button
    color="error"
    className={styles.SidemenuButton}
    onClick={logout}
  >
    {isDrawerHovered ? (
      <>
        <span className={styles.SidemenuButtonText}>Sign Out</span> <AccountCircleIcon />
      </>
    ) : (
      <AccountCircleIcon fontSize="large" />
    )}
  </Button>
) : (
  <Button
    color="info"
    className={styles.SidemenuButton}
    onClick={login}
  >
    {isDrawerHovered ? (
      <>
        <span className={styles.SidemenuButtonText}>Login</span> <AccountCircleIcon />
      </>
    ) : (
      <AccountCircleIcon fontSize="large" />
    )}
  </Button>
)}


      
      {/* Rest of your UnrankedBox content */}
      {/* ... */}

    </CustomPaper>


  );
};

export default UnrankedBox;
