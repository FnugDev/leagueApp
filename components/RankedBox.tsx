// RankedBox.tsx
import styles from '../styles/Summonerpage.module.css';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { block } from 'million/react';

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
    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    return (
      <Paper className={styles.leagueV4Box}>
        <Typography className={styles.leagueV4BoxText}>
          {queueName}
        </Typography>
        {/* <div className={styles.leagueV4BoxText}>{queueName}</div> */}
        <img
          className={styles.LeagueV4RankImage}
          alt="Summoner Profile"
          src={`https://static.bigbrain.gg/assets/lol/ranks/s13/${tier.toLowerCase()}.png`}
        />
        <Typography className={styles.LeagueV4Rank}>
          {capitalizeFirstLetter(tier)} {rank}
        </Typography>
        {/* <div className={styles.LeagueV4Rank}>{capitalizeFirstLetter(tier)} {rank}</div> */}
        <div className={styles.LeagueV4LP}>{leaguePoints} LP</div>
        <div className={styles.LeagueV4WinLoss}>{wins}W {losses}L</div>
        <div className={styles.LeagueV4WinLoss}>{winRate.toFixed(2)}% Win Rate</div>
      </Paper>
    );
};

const RankedBoxBlock = block(RankedBox)

export default RankedBox;