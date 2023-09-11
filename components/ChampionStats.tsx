// RankedBox.tsx
import Image from 'next/image';
import styles from '../styles/Summonerpage.module.css';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { block, For } from 'million/react';
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

interface ChampionStat {
  gamesPlayed: number;
  wins: number;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
}

interface ChampionStatsProps {
  championStats: { [key: string]: ChampionStat };
}

const ChampionStats: React.FC<ChampionStatsProps> = ({ championStats }) => {

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
 
      <CustomPaper className={styles.ChampionStatsBox}>
        <Typography className={styles.leagueV4BoxText}>
          Champion stats
        </Typography>
        {/* <div className={styles.leagueV4BoxText}>{queueName}</div> */}

<div className={styles.ChampionStatsContainer}>
{championStats && Object.entries(championStats).map(([championId, stat]: [string, ChampionStat], index) => (
  <div className={styles.ChampionStatsContent} key={championId}>
        <Grid container key={index} spacing={2}>
        <div className={styles.ChampionStatsContent2}>
          <Grid item xs={4}>

            <Image
              className={styles.ChampionStatsImage}
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`}
              alt={stat.championName}
              width={50}
              height={50}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography className={styles.ChampionStatsName} variant="body1">{stat.championName}</Typography>
            <Typography className={styles.ChampionStatsPlayed} variant="body2">{stat.gamesPlayed} games</Typography>
            <Typography className={styles.ChampionStatsKDA} variant="body2">{stat.kda} kda</Typography>
            <Typography className={styles.ChampionStatsKDA2} variant="body2">{stat.kills} / {stat.deaths} / {stat.assists}</Typography>
            <Typography className={styles.ChampionStatsWR} variant="body2">
              {((stat.wins / stat.gamesPlayed) * 100).toFixed(1)}%
            </Typography>

            <div className={styles.ProgressBar}>
              <div className={styles.TrendingBar} style={{ width: `${(stat.wins / stat.gamesPlayed) * 100}%` }}></div>
            </div>

          </Grid>
          </div>
        </Grid>
        </div>
      ))}
</div>


      </CustomPaper>

    );
};

const ChampionStatsBlock = block(ChampionStats)

export default ChampionStats;