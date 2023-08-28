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