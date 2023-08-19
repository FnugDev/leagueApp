import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from '../styles/MatchHistory.module.css';
import runesData from '../data/runes/13.13/en_GB/runes.json';
import React from 'react';
import { block, For } from 'million/react';




const MatchBox: React.FC<{ match: any; itemImageUrl: string; summonerImageUrl: string }> = ({
  match,
  itemImageUrl,
  summonerImageUrl,
}) => {
  const router = useRouter(); // Call useRouter at the top level
  const theme = useTheme();
  if (!match) {
    return null; 
  }




  const findPerkIconById = (perkId: number) => {
    // Loop through the runes data to find the perk with the given ID
    for (const runeData of runesData) {
      for (const slot of runeData.slots) {
        const perk = slot.runes.find((rune) => rune.id === perkId);
        if (perk) {
          return perk.icon;
        }
      }
    }
    
    // Return a default value if the perk was not found
    return "Unknown Perk";
  };
  const styleData = [];


  const findStyleIconById = (styleId: number) => {
    // Loop through the style data to find the style with the given ID
    for (const runeData of runesData) {
      if (runeData.id === styleId) {
        return runeData.icon;
      }
    }

    
    
    // Return a default value if the style was not found
    return "Unknown Style";
  };
  
  function getKDABadgeColor(kda) {
    if (kda > 5) {
      return styles.highKDA;
    } else if (kda <= 5 && kda > 3) {
      return styles.mediumKDA;
    } else if (kda <= 3 && kda >= 1) {
      return ''; // Default color, no additional class needed
    } else {
      return styles.lowKDA;
    }
  }
  
  
  

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
          width={52}
          height={52}
          className={styles.matchChampionImage}
          style={{ width: "52", height: "52" }} // Add this line
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
            style={{ width: "24.5", height: "25" }} // Add this line
            src={`${summonerImageUrl}${match.summoner2Name}.png`}
          />



<div className={styles.summonerPerk}>
<Image
    alt="Perk primary"
    width={25}
    height={25}

    src={`https://ddragon.leagueoflegends.com/cdn/img/${findPerkIconById(match.perks.styles[0].selections[0].perk)}`}
  />
</div>
<div className={styles.summonerPerk}>
<Image
    alt="Perk sub"
    width={25} // Set the width to 25 for consistency with the primary image
    height={25} // Set the height to 25 for consistency with the primary image

    style={{ width: "18px", height: "18px" }} // Adjust this style to control the displayed size
    src={`https://ddragon.leagueoflegends.com/cdn/img/${findStyleIconById(match.perks.styles[1].style)}`}
  />
</div>


        </Grid>

        <Grid container className={styles.matchGridThree}>
        <h1 className={styles.matchKDAScore}>
    <span className={styles.kdaKills}>{match.kills}</span> /
    <span className={styles.kdaDeaths}> {match.deaths}</span> / 
    <span className={styles.kdaAssists}> {match.assists}</span>
  </h1>
          <h1 className={styles.matchKDA}>
            <span className={getKDABadgeColor(match.kda)}>{match.kda}</span> KDA
          </h1>
          <h1 className={styles.matchCS}>{match.totalMinionsKilled} CS ({match.csPerMinute})</h1>
        </Grid>
        {/* <Typography className={styles.matchInfo}>
          {match.kills} / {match.deaths} / {match.assists} 
        </Typography> */}



        <Grid container className={styles.itemsContainer} spacing={0}>
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
        </Grid>

        <Grid container className={styles.summonersContent} spacing={0}>
  <Grid item container xs={6} sm={6} className={styles.summonersColumn}>
    <For each={match.summoners ? match.summoners.slice(0, 5) : []} index="index">
      {(summoner: string, index: number) => (
        <Grid item xs={12} key={index} className={styles.summonerName}>
          <div className={styles.summonerInfo}>
            <Image
              className={styles.championImage}
              width={15}
              height={15}
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${match.championIds[index]}.png`}
              alt={`Champion ${match.championIds[index]} Image`}
            />
                <a
                  href={`/summoner/${router.query.region}/${encodeURIComponent(summoner)}`}
                  className={styles.summonerName}
                >
                  {summoner}
                </a>
          </div>
        </Grid>
      )}
    </For>
  </Grid>
  <Grid item container xs={6} sm={6} className={styles.summonersColumn}>
    <For each={match.summoners ? match.summoners.slice(5, 10) : []} index="index">
      {(summoner: string, index: number) => (
        <Grid item xs={12} key={index} className={styles.summonerName}>
          <div className={styles.summonerInfo}>
            <Image
              className={styles.championImage}
              width={15}
              height={15}
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${match.championIds[index + 5]}.png`}
              alt={`Champion ${match.championIds[index + 5]} Image`}
            />
                <a
                  href={`/summoner/${router.query.region}/${encodeURIComponent(summoner)}`}
                  className={styles.summonerName}
                >
                  {summoner}
                </a>
                
          </div>
        </Grid>
      )}
    </For>
  </Grid>
</Grid>










      </div>
    </Box>
  );
};

const MatchBoxBlock = block(MatchBox);

export default MatchBox;
