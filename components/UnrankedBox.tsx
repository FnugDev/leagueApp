// UnrankedBox.tsx
import styles from '../styles/Summonerpage.module.css';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';
import React from 'react';

interface UnrankedBoxProps {
  title: string;
  text: string;
}

const UnrankedBox: React.FC<UnrankedBoxProps> = ({ title, text }) => {
  const CustomPaper = styled(Paper)(({ theme }) => ({
    // backdropFilter: 'blur(10px)',
    backgroundColor: theme.vars.palette.cbox,
    // boxShadow: '0px 0px 1px #d9d9d9, 0px 1px 1px #d9d9d9',

    [theme.getColorSchemeSelector('dark')]: {
      // backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.cbox,
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));
  return (
    <CustomPaper className={styles.LeagueV4Unranked}>
      <Typography className={styles.LeagueV4Title}>
        {title}
      </Typography>
      <Typography className={styles.LeagueV4UnrankedText}>
        {text}
      </Typography>
    </CustomPaper>
  );
};

export default UnrankedBox;
