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
  const paperStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? styles.darkModePaper : '#eaeffc',

  };
  
  const CustomPaper = styled(Paper)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: theme.vars.palette.sidemenu,
    boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',

    [theme.getColorSchemeSelector('dark')]: {
      backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.sidemenu,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));
  
  return (


    <CustomPaper elevation={0} className={`${styles.sideMenuDrawer} ${isDrawerHovered ? styles.expanded : ''}`}
    onMouseEnter={() => setIsDrawerHovered(true)}
    onMouseLeave={() => setIsDrawerHovered(false)}
 
    >



<div className={styles.sideMenuHeader}>
<div className={styles.imageAndDividerContainer}>
    <Avatar src="../../viola.png" sx={{ width: 50, height: 50 }} />
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

{showLoginButton ? (
        <Button
          color="info"
          className={styles.SidemenuButton}
          onClick={handleLogin}
        >
          {isDrawerHovered ? (
            <>
            <span className={styles.SidemenuButtonText}>Login</span> <AccountCircleIcon />
            </>
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
        </Button>
      ) : (
        <Button
          color="error"
          className={styles.SidemenuButton}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      )}

      
      {/* Rest of your UnrankedBox content */}
      {/* ... */}

    </CustomPaper>


  );
};

export default UnrankedBox;
