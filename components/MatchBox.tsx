import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from '../styles/MatchHistory.module.css';
import React from 'react';
import { block, For } from 'million/react';
import { useTheme } from '@mui/material/styles';


const MatchBox: React.FC<{ match: any; itemImageUrl: string; summonerImageUrl: string }> = ({
  match,
  itemImageUrl,
  summonerImageUrl,
}) => {
  if (!match) {
    return null; 
  }

  const theme = useTheme(); // Get the current theme

  const paperStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#FFFFFF' : 'white',

  };

  const matchOutcomeStyle = match.win ? styles.blueMatchBox : styles.redMatchBox;

  return (
    <Box className={`${styles.matchBox} ${matchOutcomeStyle}`} key={match.matchId}>
      <div className={styles.matchBoxContent}>
        <Grid container className={styles.matchGridOne}>
          <h1 className={styles.matchQueue}>{match.queueName}</h1>
          <h1 className={styles.matchTimeSince}>{match.timeSinceMatch}</h1>
          <div className={styles.textGridUno}>
          <h1 className={`${styles.matchWinLoss} ${match.win ? styles.win : styles.loss}`}>
            {match.win ? 'WIN' : 'LOSS'} 
          </h1>
          <h1 className={styles.matchDuration}>{match.gameDuration}</h1>
          </div>

          
        </Grid>


        
        <Image
          alt="Summoner Profile"
          width={50}
          height={50}
          className={styles.matchChampionImage}
          style={{ width: "50", height: "50" }} // Add this line
          src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${match.championId}.png`}
        />

        <Grid container className={styles.matchGridTwo}>
          <Image
            alt="Summoner Spell 1"
            width={25}
            height={25}
            className={styles.summonerImage}
            style={{ width: "25", height: "25" }} // Add this line
            src={`${summonerImageUrl}${match.summoner1Name}.png`}
          />

          <Image
            alt="Summoner Spell 2"
            width={25}
            height={25}
            className={styles.summonerImage}
            style={{ width: "25", height: "25" }} // Add this line
            src={`${summonerImageUrl}${match.summoner2Name}.png`}
          />
        </Grid>

        <Typography className={styles.matchInfo}>
          {match.kills} / {match.deaths} / {match.assists}
        </Typography>

        <div container className={styles.itemsContainer} spacing={0}>
          <For each={match.items ? Object.values(match.items) : []}>
            {(itemId: unknown, index: number) => (
              <Grid item xs={2} sm={4} key={index} style={{ margin: 0 }}>
                {itemId !== 0 ? (
                  <Image
                    className={styles.itemImage}
                    key={itemId as string}
                    alt="Item"
                    width={25}
                    height={25}
                    src={`${itemImageUrl}${itemId as string}.png`}
                  />
                ) : (
                  <div className={styles.missingItem} />
                )}
              </Grid>
            )}
          </For>
        </div>
      </div>
    </Box>
  );
};

const MatchBoxBlock = block(MatchBox);

export default MatchBox;
