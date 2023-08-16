import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from '../styles/MatchHistory.module.css';
import React from 'react';
import { block, For } from 'million/react';

const MatchBox: React.FC<{ match: any; itemImageUrl: string; summonerImageUrl: string }> = ({
  match,
  itemImageUrl,
  summonerImageUrl,
}) => {
  if (!match) {
    return null; 
  }

  const matchOutcomeStyle = match.win ? styles.blueMatchBox : styles.redMatchBox;

  return (
    <Box className={`${styles.matchBox} ${matchOutcomeStyle}`} key={match.matchId}>
      <Grid container className={styles.matchGridOne}>
        <h1 className={styles.matchQueue}>{match.queueName}</h1>
        <h1 className={styles.matchTimeSince}>{match.timeSinceMatch}</h1>
        <h1 className={`${styles.matchWinLoss} ${match.win ? styles.win : styles.loss}`}>
          {match.win ? 'WIN' : 'LOSS'}
        </h1>
        <h1 className={styles.matchDuration}>{match.gameDuration}</h1>
      </Grid>

      <Image
  alt="Summoner Profile"
  width={20}
  height={20}
  className={`${styles.image} object-cover`}
  style={{ width: "auto", height: "auto" }} // Add this line
  src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${match.championId}.png`}
/>

<Image
  alt="Summoner Spell 1"
  width={30}
  height={30}
  className={`${styles.image} object-cover`}
  style={{ width: "auto", height: "auto" }} // Add this line
  src={`${summonerImageUrl}${match.summoner1Name}.png`}
/>

<Image
  alt="Summoner Spell 2"
  width={30}
  height={30}
  className={`${styles.image} object-cover`}
  style={{ width: "auto", height: "auto" }} // Add this line
  src={`${summonerImageUrl}${match.summoner2Name}.png`}
/>

      <Typography className={styles.matchInfo}>
        {match.kills}/{match.deaths}/{match.assists}
      </Typography>

      <Grid container className={styles.itemsContainer}>
        <For each={match.items ? Object.values(match.items) : []}>
          {(itemId: unknown, index: number) => (
            <Grid item xs={2} sm={4} key={index}>
              {itemId !== 0 ? (
                <Image
                  className={styles.itemImage}
                  key={itemId as string}
                  alt="Item"
                  width={30}
                  height={30}
                  src={`${itemImageUrl}${itemId as string}.png`}
                />
              ) : (
                <div className={styles.missingItem} />
              )}
            </Grid>
          )}
        </For>
      </Grid>
    </Box>
  );
};

const MatchBoxBlock = block(MatchBox);

export default MatchBox;
