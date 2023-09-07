// RankedBox.tsx
import Image from 'next/image';
import styles from '../styles/Summonerpage.module.css';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { block } from 'million/react';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';
// Inside your component


interface RankedBoxProps {
  queueName: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winRate: number;
}



const RankedBox: React.FC<RankedBoxProps> = ({ queueName, tier, rank, leaguePoints, wins, losses, winRate }) => {
  const CustomContainer = styled(Paper)(({ theme }) => ({

    marginRight: '50px',
    marginBottom:'20px',
    padding: 'calc(7px)', // Use the provided variable values
    backgroundColor: 'transparent',
    outline: 'var(--t) solid black', // Apply the provided border color and thickness
    outlineOffset: 'calc(-1*var(--t))', // Apply the negative of the border thickness
    WebkitMask: `
    conic-gradient(at var(--s) var(--s),#0000 75%,#000 0)
    0 0/calc(100% - var(--s)) calc(100% - var(--s)),
    linear-gradient(#000 0 0) content-box
    `,
  
    '--s': '50px', // Corner size
    '--t': '2px', // Border thickness
    '--g': '10px', // Gap between border and image

    [theme.getColorSchemeSelector('dark')]: {
      // backdropFilter: 'blur(10px)',
      backgroundColor: 'transparent',
      background: 'transparent',
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));
  const CustomPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.vars.palette.cbox,
    
    [theme.getColorSchemeSelector('dark')]: {
      // backdropFilter: 'blur(10px)',
      backgroundColor: theme.vars.palette.cbox,
      // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
  }));

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    return (
 
      <CustomPaper className={styles.leagueV4Box}>
        <Typography className={styles.leagueV4BoxText}>
          {queueName}
        </Typography>
        {/* <div className={styles.leagueV4BoxText}>{queueName}</div> */}
        <Image
          className={styles.LeagueV4RankImage}
          alt="Summoner Profile"
          width={50}
          height={50}
          src={`https://static.bigbrain.gg/assets/lol/ranks/s13/${tier.toLowerCase()}.png`}
        />
        <Typography className={styles.LeagueV4Rank}>
          {capitalizeFirstLetter(tier)} {rank}
        </Typography>
        {/* <div className={styles.LeagueV4Rank}>{capitalizeFirstLetter(tier)} {rank}</div> */}
        <div className={styles.LeagueV4LP}>{leaguePoints} LP</div>
        <div className={styles.LeagueV4WinLoss}>{wins}W {losses}L</div>
        <div className={styles.LeagueV4WinLoss}>{winRate.toFixed(2)}% Win Rate</div>
      </CustomPaper>

    );
};

const RankedBoxBlock = block(RankedBox)

export default RankedBox;