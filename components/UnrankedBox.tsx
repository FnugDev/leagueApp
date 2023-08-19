// UnrankedBox.tsx
import styles from '../styles/Summonerpage.module.css';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface UnrankedBoxProps {
  title: string;
  text: string;
}

const UnrankedBox: React.FC<UnrankedBoxProps> = ({ title, text }) => {
  const theme = useTheme(); // Get the current theme

  const paperStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? styles.darkModePaper : '#fbfcff',

  };
  return (
    <Paper className={styles.LeagueV4Unranked} style={paperStyle}>
      <Typography className={styles.LeagueV4Title}>
        {title}
      </Typography>
      <Typography className={styles.LeagueV4UnrankedText}>
        {text}
      </Typography>
    </Paper>
  );
};

export default UnrankedBox;
