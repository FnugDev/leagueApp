// React and Next.js
import React, { useState } from 'react';
import Image from 'next/image';

// Material UI
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Typography,
  Button,
  styled,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';

// Local imports
import styles from '../styles/Summonerpage.module.css';
import { block, For } from 'million/react';

interface QueueSpecificStats { gamesPlayed: number; wins: number; kills: number; deaths: number; assists: number; kda: number;}
interface ChampionStat { championName: string; statsPerQueue: { [queueName: string]: QueueSpecificStats };}
interface ChampionStatsProps { championStats: { [key: string]: ChampionStat };}

const ChampionStats: React.FC<ChampionStatsProps> = ({ championStats }) => {
  const [sortKey, setSortKey] = React.useState<'gamesPlayed' | 'kda' | 'winrate'>('gamesPlayed');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [selectedQueue, setSelectedQueue] = React.useState<string | null>("ALL_QUEUES");
  const [showAllMatches, setShowAllMatches] = React.useState(false);
  const queueTypes = [
    { label: 'All', value: "ALL_QUEUES" },
    { label: 'Ranked', value: 'All Ranked' },
    { label: 'Solo', value: 'Ranked Solo ' },
    { label: 'Flex', value: 'Ranked Flex ' },
    { label: 'ARAM', value: 'ARAM ' },
    { label: 'Normal Draft', value: 'Draft Pick ' },
    { label: 'Normal Blind', value: 'Blind Pick ' },
  ];

  const sortChampionStats = (stats: { [key: string]: ChampionStat }) => {
    const aggregatedStats = Object.entries(stats).reduce((acc, [championId, stat]) => {
      Object.entries(stat.statsPerQueue).forEach(([queueName, queueStat]) => {
        if (selectedQueue !== "ALL_QUEUES" && queueName !== selectedQueue && selectedQueue !== 'All Ranked') return;
        if (selectedQueue === 'All Ranked' && !['Ranked Solo ', 'Ranked Flex '].includes(queueName)) return;
  
        if (!acc[championId]) {
          acc[championId] = { championId, championName: stat.championName, gamesPlayed: 0, wins: 0, kda: 0 };
        }
  
        const totalGamesSoFar = acc[championId].gamesPlayed;
        const totalGamesNew = totalGamesSoFar + queueStat.gamesPlayed;
        acc[championId].kda = ((acc[championId].kda * totalGamesSoFar) + (queueStat.kda * queueStat.gamesPlayed)) / totalGamesNew;
        acc[championId].gamesPlayed += queueStat.gamesPlayed;
        acc[championId].wins += queueStat.wins;
      });
  
      return acc;
    }, {} as { [key: string]: any });
  
    // Convert the aggregated stats into an array
    const filteredStats = Object.values(aggregatedStats);
  
    // Sort the stats
    return filteredStats.sort((a: any, b: any) => {
      let aValue, bValue;
      switch (sortKey) {
        case 'gamesPlayed':
          aValue = a.gamesPlayed;
          bValue = b.gamesPlayed;
          break;
        case 'kda':
          aValue = a.kda;
          bValue = b.kda;
          break;
        case 'winrate':
          aValue = a.wins / a.gamesPlayed;
          bValue = b.wins / b.gamesPlayed;
          break;
      }
      return sortOrder === 'asc' ? bValue - aValue : aValue - bValue;
    });
  };
  
  
  const sortedStats = sortChampionStats(championStats);

  const displayedStats = showAllMatches ? sortedStats : sortedStats.slice(0, 6);

  const handleShowAllMatchesClick = () => {
    setShowAllMatches(true);
  };

  const handleShowLessMatchesClick = () => {
    setShowAllMatches(false);
  };

  function getKDABadgeColor(kda) {
    if (kda > 5) {
      return '#f8b664';
    } else if (kda <= 5 && kda > 3) {
      return '#3174fa';
    } else if (kda <= 3 && kda >= 1) {
      return ''; // Default color, no additional class needed
    } else {
      return '#ff4e50';
    }
  }

  function getWinrateColor(winrate) {
    if (winrate >= 80) {
      return '#f8b664';
    } else if (winrate >= 35) {
      return '#3174fa';
    } else {
      return '#ff4e50';
    }
  }
  const ColoredArrowIcon = (props) => {
    return <ArrowDropDownIcon {...props} />;
  };
    
  return (
    <CustomPaper className={styles.ChampionStatsBox}>

      <Typography className={styles.leagueV4BoxText}>
        Champion stats
      </Typography>

      <div className={styles.ChampionStatsQueueForm}>
        <CustomSelect
          value={selectedQueue}
          onChange={(e) => setSelectedQueue(e.target.value as string)}
          label="Queue Type"
          variant="standard"
          color="info"
          disableUnderline
          IconComponent={ColoredArrowIcon}
          className={styles.ChampionStatsQueueFormSelect}
        >
          {queueTypes.map((queue, index) => (
            <MenuItem key={index} value={queue.value}>
              {queue.label}
            </MenuItem>
          ))}
        </CustomSelect>

      </div>
      <div className={styles.ChampionStatsSorting}>
        <SortIcon color="info" className={styles.ChampionStatsSortingIcon}/>
        <Typography className={styles.ChampionStatsSortingText}>
          Filter
        </Typography>
        <Button className={styles.ChampionStatsSortingBtn} variant="outlined" disabled={sortKey === 'gamesPlayed'} color="info" onClick={() => setSortKey('gamesPlayed')}>Played</Button>
        <Button className={styles.ChampionStatsSortingBtn} variant="outlined" disabled={sortKey === 'kda'} color="info" onClick={() => setSortKey('kda')}>KDA</Button>
        <Button className={styles.ChampionStatsSortingBtn} variant="outlined" disabled={sortKey === 'winrate'} color="info" onClick={() => setSortKey('winrate')}>W/R</Button>
      </div>
      
      <div className={styles.ChampionStatsContainer}>
        <For each={displayedStats}>
          {(stat, index) => (
            <div className={styles.ChampionStatsContent} key={`${stat.championId}-${stat.queueName}`}>
              <Grid container key={index} spacing={2}>
                <div className={styles.ChampionStatsContent2}>
                  <Grid item xs={4}>
                    <Image
                      className={styles.ChampionStatsImage}
                      src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${stat.championId}.png`}
                      alt={stat.championName}
                      width={50}
                      height={50}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className={styles.ChampionStatsName} variant="body2">{stat.championName}</Typography>
                    <Typography className={styles.ChampionStatsPlayed} variant="body2">{stat.gamesPlayed} games</Typography>
                    <Typography className={styles.ChampionStatsKDA} variant="body2" style={{ color: getKDABadgeColor(stat.kda)}}>{(stat.kda).toFixed(2)} kda</Typography>
                    <Typography className={styles.ChampionStatsKDA2} variant="body2">{stat.kills} / {stat.deaths} / {stat.assists}</Typography>
                    {/* <Typography className={styles.ChampionStatsWR} variant="body2" style={{ color: getWinrateColor(((stat.wins / stat.gamesPlayed) * 100))}}> */}
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
          )}
        </For>

        {!showAllMatches && sortedStats.length > 6 && (
          <Button
            className={styles.ShowAllButton}
            variant="text"
            color="info"
            onClick={handleShowAllMatchesClick}
          >
            Show All
          </Button>
        )}

        {showAllMatches && (
          <Button
            className={styles.ShowAllButton}
            variant="text"
            color="info"
            onClick={handleShowLessMatchesClick}
          >
            Show Less
          </Button>
        )}
      </div>
    </CustomPaper>
    );
};

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.vars.palette.cbox,
  
  [theme.getColorSchemeSelector('dark')]: {
    // backdropFilter: 'blur(10px)',
    backgroundColor: theme.vars.palette.cbox,
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.vars.palette.cbox,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  
  [theme.getColorSchemeSelector('dark')]: {
    backgroundColor: theme.vars.palette.cbox,
  },
}));

const ChampionStatsBlock = block(ChampionStats)

export default ChampionStats;