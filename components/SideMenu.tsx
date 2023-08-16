// UnrankedBox.tsx

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import LoginAndRegister from './LoginRegistration';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React from 'react';
import styles from '../styles/Summonerpage.module.css';
import { block } from 'million/react';


const SideMenu: React.FC<{
  showLoginForm: boolean;
  showLogin: () => void;
}> = ({ showLoginForm, showLogin }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [showLoginButton, setShowLoginButton] = useState(false);

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

  return (
    <Paper elevation={0} className={styles.SideMenu} style={{ /* Add other styles here based on the theme mode */ }}>
      <div className={styles.SideMenuContainer}>
        <Avatar sx={{ width: 50, height: 50 }} />
        <Divider />
        {showLoginButton ? (
          <Button color="info" className={styles.SidemenuButton} variant="outlined" onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button color="error" className={styles.SidemenuButton} variant="outlined" onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </div>
    </Paper>
  );
};

// const SideMenuBlock = block(SideMenu)

export default SideMenu;
