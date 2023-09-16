import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { Client, Summoner, Region } from 'shieldbow';
import fetch from 'node-fetch';
import queueData from './queues.json'; // Import the queues.json file
import summonerSpellData from './summonerSpells.json'; // Import the queues.json file
import cache from 'memory-cache';
import { sql } from "@vercel/postgres";

export async function getSummonerData(cacheKey: string) {
  const { rows } = await sql`SELECT * FROM summoners WHERE cache_key=${cacheKey} LIMIT 1`;
  return rows.length > 0 ? rows[0] : null;
}

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS summoners (
      cache_key TEXT UNIQUE,
      data JSONB
    );
  `;
}

async function startApp() {
  await initializeDatabase();
  // Your code to start the server
}

// startApp();

export async function updateSummonerData(cacheKey: string, data: any) {
  // Updating the data for the given cache key. If it doesn't exist, it will be created.
  await sql`
    INSERT INTO summoners (cache_key, data)
    VALUES (${cacheKey}, ${JSON.stringify(data)})
    ON CONFLICT (cache_key)
    DO UPDATE SET data = ${JSON.stringify(data)};
  `;
}

type RegionCode = keyof typeof regionCodeMap;
type PlatformCode = keyof typeof platformToRegionMap;

const regionCodeMap = {
  br: 'BR1',
  eune: 'EUN1',
  euw: 'EUW1',
  jp: 'JP1',
  kr: 'KR',
  lan: 'LA1',
  las: 'LA2',
  na: 'NA1',
  oce: 'OC1',
  tr: 'TR1',
  ru: 'RU',
  ph: 'PH2',
  sg: 'SG2',
  th: 'TH2',
  tw: 'TW2',
  vn: 'VN2',
};


const platformToRegionMap = {
  BR1: 'americas',
  EUN1: 'europe',
  EUW1: 'europe',
  JP1: 'asia',
  KR: 'asia',
  LA1: 'americas',
  LA2: 'americas',
  NA1: 'americas',
  OC1: 'americas',
  TR1: 'europe',
  RU: 'europe',
  PH2: 'asia',
  SG2: 'asia',
  TH2: 'asia',
  TW2: 'asia',
  VN2: 'asia',
};

interface QueueSpecificChampionStat {
  gamesPlayed: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  totalKDA: number;
  kda: number;
}

interface ChampionStat {
  statsPerQueue: { [queueName: string]: QueueSpecificChampionStat };
  championName: string;
}

interface ChampionStats {
  [championId: string]: ChampionStat;
}


interface PlayerChip {
  name: string;
  desc: string;
  icon: any;
  color: string;
}

type QueueType = 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR';
type QueueInfo = {
  queueType: QueueType;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};



const playerChips: PlayerChip[] = [];

const CACHE_DURATION = 1 * 60 * 1000;
const MAX_MATCH_HISTORY_COUNT = 19; 
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { region, username: summonerName } = _req.query as { region: RegionCode, username: string };
  const modifiedRegion = regionCodeMap[region] as PlatformCode;
  const platform = platformToRegionMap[modifiedRegion]?.toUpperCase();

  if (!modifiedRegion || !platform) {
    return res.status(400).json({ message: 'Invalid region code.' });
  }

  const cacheKey = `${modifiedRegion}-${summonerName}`;
  const apiKey = 'RGAPI-0cadcd0b-3bd8-472f-8b2e-36b86fc2e973';
  
  try {
    const cachedData = cache.get(cacheKey);
    let storedData = cachedData;

    // If no data in cache, check the database
    if (!cachedData) {
      const dbData = await getSummonerData(cacheKey);
      if (dbData) {
        console.log("Fetched data from database");
        storedData = dbData.data;
      }
    }

    const summoner = await fetchData(`https://${modifiedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
    const leagueV4 = await fetchData(`https://${modifiedRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${apiKey}`);
    const newMatches: string[] = await fetchData(`https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=${MAX_MATCH_HISTORY_COUNT}&api_key=${apiKey}`);

    const summonerData = {
      name: summoner.name,
      level: summoner.summonerLevel,
      accountId: summoner.accountId,
      summonerId: summoner.id,
      puuid: summoner.puuid,
      profileIcon: summoner.profileIconId,
    };

    // const summonerLiveResponse = await fetch(`https://${modifiedRegion}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerData.summonerId}?api_key=${apiKey}`);

    // let summonerLive = null;
    // if (summonerLiveResponse.ok) {
    //   summonerLive = await summonerLiveResponse.json();
    // } else if (summonerLiveResponse.status === 404) {
    //   // Summoner is not in a game
    //   console.log('Summoner is not in a game');
    // } else {
    //   throw new Error('Failed to fetch summoner live data');
    // }
    // const cacheKey = `${modifiedRegion}-${summonerName}`;

    const soloQueueInfo = getQueueInfo('RANKED_SOLO_5x5', leagueV4);
    const flexQueueInfo = getQueueInfo('RANKED_FLEX_SR', leagueV4);

    // If cache is empty or doesn't have match history, populate it with fetched match data
    if (!storedData) {
      const newMatchData = await fetchMatchData(newMatches, apiKey, summonerData.puuid, platform);
      const championStats: ChampionStats = calculateChampionStats(newMatchData);

      await updateSummonerData(cacheKey, {
        summonerData,
        playerChips,
        soloQueueInfo,
        flexQueueInfo,
        championStats,
        matchHistory: newMatchData,
      });
      return res.status(200).json({
        summonerData,
        playerChips,
        soloQueueInfo,
        flexQueueInfo,
        championStats,
        matchHistory: newMatchData,
      });
    }

    // Fetch only new matches if we already have stored data
    const storedMatches = storedData.matchHistory || [];
    const storedMatchIds = storedMatches.map(match => match.matchId);  // Extract just the match IDs
    const newMatchesToFetch = newMatches.filter(matchId => !storedMatchIds.includes(matchId));
    const storedMatchesWithTime = storedMatches.map(match => calculateTimeSinceMatch(match));

      const newMatchData = await fetchMatchData(newMatchesToFetch, apiKey, summonerData.puuid, platform);
      const updatedMatchHistory = [...newMatchData, ...storedMatchesWithTime];
      console.log('New Matches to Fetch:', newMatchesToFetch);  // Add for debugging
      const championStats: ChampionStats = calculateChampionStats(updatedMatchHistory);
      updatePlayerStreaksAndChips(updatedMatchHistory,playerChips)
    // Update database and cache
    await updateSummonerData(cacheKey, {
      summonerData,
      playerChips,
      soloQueueInfo,
      flexQueueInfo,
      championStats,
      matchHistory: updatedMatchHistory,
    });
    
    cache.put(cacheKey, {
      summonerData,
      playerChips,
      soloQueueInfo,
      flexQueueInfo,
      championStats,
      matchHistory: updatedMatchHistory,
    }, CACHE_DURATION);
    
    res.status(200).json({ 
      summonerData,
      playerChips,
      soloQueueInfo,
      flexQueueInfo,
      championStats,
      matchHistory: updatedMatchHistory,
    });



  } catch (error) {
    console.error('Error fetching summoner:', error);
    res.status(500).json({ message: 'Failed to fetch summoner data' });
  }
};
class RequestQueue {
  private queue: (() => Promise<any>)[] = [];
  private concurrentRequests: number;
  private running: number = 0;
  private idleResolve: (() => void) | null = null;
  private idlePromise: Promise<void> | null = null;

  constructor(concurrentRequests: number = 5) {
    this.concurrentRequests = concurrentRequests;
  }

  enqueue(fn: () => Promise<any>) {
    this.queue.push(fn);
    this.processQueue();
  }

  onIdle(): Promise<void> {
    if (this.running === 0 && this.queue.length === 0) {
      return Promise.resolve();
    }

    this.idlePromise = new Promise(resolve => {
      this.idleResolve = resolve;
    });

    return this.idlePromise;
  }

  async processQueue() {
    if (this.running >= this.concurrentRequests || this.queue.length === 0) {
      if (this.running === 0 && this.idleResolve) {
        this.idleResolve();
        this.idlePromise = null;
        this.idleResolve = null;
      }
      return;
    }

    this.running++;
    const fn = this.queue.shift()!;

    try {
      await fn();
    } catch (err) {
      console.error('An error occurred:', err);
    }

    this.running--;
    this.processQueue();
  }
}





const retryableFetch = async (url: string, retries: number = 0, maxRetries: number) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries < maxRetries) {
      console.warn(`Request failed. Retrying (Attempt ${retries + 1})...`);
      return retryableFetch(url, retries + 1, maxRetries);
    } else {
      console.error(`Request failed after ${maxRetries} attempts. Error:`, error);
      throw error;
    }
  }
};

async function fetchMatchData(matches: string[], apiKey: string, puuid: string, platform: string) {
  const currentTime = Date.now();
  // Assuming playerChips is globally accessible
  playerChips.length = 0;

  const fetchMatch = async (matchId: string) => {
    try {
      const gameData = await retryableFetch(
        `https://${platform}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`,
        0, 5
      );
      
      if (gameData.info.queueId === 1700) {
        return null; // Skip this match
      }

      const participant = gameData.info.participants.find((p: { puuid: any; }) => p.puuid === puuid);
      if (!participant) {
        console.log(`Participant for summoner not found in match ${matchId}`);
        return null;
      }

      const { win, kills, deaths, assists, championName, championId, summoner1Id, summoner2Id, item0, item1, item2, item3, item4, item5, perks, totalMinionsKilled, teamEarlySurrendered, teamId,teamPosition, individualPosition} = participant;
      const { gameMode, gameId, gameCreation, gameEndTimestamp, gameDuration, queueId } = gameData.info;

      const queueName = getQueueNameById(gameData.info.queueId, queueData);

      const summoner1Name = getSummonerSpellNameById(summoner1Id, summonerSpellData);
      const summoner2Name = getSummonerSpellNameById(summoner2Id, summonerSpellData);

      const timeSinceMatch = Math.floor((currentTime - gameEndTimestamp) / 1000);
      const timeSinceMatchText = formatTimeSinceMatch(timeSinceMatch);

      const formattedGameDuration = formatGameDuration(gameDuration);

      const csPerMinute = (totalMinionsKilled / (gameDuration / 60)).toFixed(1);
      const kda = ((kills + assists) / deaths).toFixed(2);

      const participantSummonerNames = gameData.info.participants.map(
        (p: { summonerName: any }) => p.summonerName
      );
      const participantChampionIds = gameData.info.participants.map(
        (p: { championId: any }) => p.championId
      );

      const processedData = {
        matchId,
        game_mode: gameMode,
        queueId: queueId,
        queueName,
        summoners: participantSummonerNames,
        championIds: participantChampionIds,
        win,
        kills,
        deaths,
        assists,
        kda,
        totalMinionsKilled,
        csPerMinute,
        teamEarlySurrendered, 
        teamId,
        teamPosition,
        champion_name: championName,
        championId,
        summoner1Id,
        summoner1Name,
        summoner2Name,
        items: { item0, item1, item2, item3, item4, item5 },
        perks: perks,
        timeSinceMatch: timeSinceMatchText,
        gameDuration: formattedGameDuration,
        gameEndTimestamp,
      };
      return processedData; // Replace processedData with your actual processed data.
    } catch (error) {
      console.error(`Error fetching match ${matchId}:`, error);
      return null;
    }
  };

  const matchPromises = matches.map(fetchMatch);
  const settledMatches = await Promise.allSettled(matchPromises);

  const filteredMatchData = settledMatches.reduce((acc, settled) => {
    if (settled.status === 'fulfilled' && settled.value !== null) {
      acc.push(settled.value);
    }
    return acc;
  }, [] as any[]);

  // Do something with the filteredMatchData if needed.
  
  return filteredMatchData;
}

// async function fetchMatchData(matches: any[], apiKey: string, puuid: any, platform: string) {
//   const currentTime = Date.now();
//   playerChips.length = 0;
//   const requestQueue = new RequestQueue(5);
//   const matchData: any[] = [];
//   const matchOutcomes: string[] = []; 
  

//   matches.forEach(matchId => {
//     requestQueue.enqueue(async () => {
//       try {
//         const gameData = await retryableFetch(
//           `https://${platform}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`,
//           0, 5
//         );

//       if (gameData.info.queueId === 1700) {
//         return null; // Skip this match
//       }

//       const participant = gameData.info.participants.find((p: { puuid: any; }) => p.puuid === puuid);
//       if (!participant) {
//         console.log(`Participant for summoner not found in match ${matchId}`);
//         return null;
//       }

//       const { win, kills, deaths, assists, championName, championId, summoner1Id, summoner2Id, item0, item1, item2, item3, item4, item5, perks, totalMinionsKilled, teamEarlySurrendered, teamId,teamPosition, individualPosition} = participant;
//       const { gameMode, gameId, gameCreation, gameEndTimestamp, gameDuration, queueId } = gameData.info;




//       const queueName = getQueueNameById(gameData.info.queueId, queueData);

//       const summoner1Name = getSummonerSpellNameById(summoner1Id, summonerSpellData);
//       const summoner2Name = getSummonerSpellNameById(summoner2Id, summonerSpellData);

//       const timeSinceMatch = Math.floor((currentTime - gameEndTimestamp) / 1000);
//       const timeSinceMatchText = formatTimeSinceMatch(timeSinceMatch);

//       const formattedGameDuration = formatGameDuration(gameDuration);

//       const csPerMinute = (totalMinionsKilled / (gameDuration / 60)).toFixed(1);
//       const kda = ((kills + assists) / deaths).toFixed(2);

//       const participantSummonerNames = gameData.info.participants.map(
//         (p: { summonerName: any }) => p.summonerName
//       );
//       const participantChampionIds = gameData.info.participants.map(
//         (p: { championId: any }) => p.championId
//       );

//       const processedData = {
//         matchId,
//         game_mode: gameMode,
//         queueId: queueId,
//         queueName,
//         summoners: participantSummonerNames,
//         championIds: participantChampionIds,
//         win,
//         kills,
//         deaths,
//         assists,
//         kda,
//         totalMinionsKilled,
//         csPerMinute,
//         teamEarlySurrendered, 
//         teamId,
//         teamPosition,
//         champion_name: championName,
//         championId,
//         summoner1Id,
//         summoner1Name,
//         summoner2Name,
//         items: { item0, item1, item2, item3, item4, item5 },
//         perks: perks,
//         timeSinceMatch: timeSinceMatchText,
//         gameDuration: formattedGameDuration,
//         gameEndTimestamp,
//       };
      
//       matchData.push(processedData);
//     } catch (error) {
//       console.error(`Error fetching match ${matchId}:`, error);

//     }
//   });
// })

//   // const matchData = await Promise.all(matchPromises);
//   await requestQueue.onIdle();

//   // Filter out null and undefined matches
//   const filteredMatchData = matchData.filter(match => match !== null && match !== undefined);

//   return filteredMatchData;
// }


function calculateChampionStats(matchData: any[]): { [key: string]: ChampionStat } {
  const championStats: { [key: string]: ChampionStat } = {};

  matchData.forEach((matchEntry) => {
    const { queueName, championId, champion_name, kills, deaths, assists, win, kda } = matchEntry;

    if (!championStats[championId]) {
      championStats[championId] = {
        statsPerQueue: {},
        championName: champion_name,
      };
    }

    if (!championStats[championId].statsPerQueue[queueName]) {
      championStats[championId].statsPerQueue[queueName] = {
        gamesPlayed: 0,
        wins: 0,
        kills: 0,  // Initialize to 0
        deaths: 0, // Initialize to 0
        assists: 0,// Initialize to 0
        totalKDA: 0,
        kda: 0,
      };
    }

    const stat = championStats[championId].statsPerQueue[queueName];
    stat.gamesPlayed++;
    stat.kills += kills;  // Aggregate kills
    stat.deaths += deaths; // Aggregate deaths
    stat.assists += assists; // Aggregate assists
    const newKDA = parseFloat(kda);
    stat.totalKDA += newKDA;

    if (win) {
      stat.wins++;
    }
  });

  // Recalculate KDA
  Object.values(championStats).forEach((champStat) => {
    Object.values(champStat.statsPerQueue).forEach((queueStat) => {
      queueStat.kda = queueStat.totalKDA / queueStat.gamesPlayed;
    });
  });

  return championStats;
}
function calculateTimeSinceMatch(match) {
  const currentTime = Date.now();
  const timeSinceMatch = Math.floor((currentTime - match.gameEndTimestamp) / 1000);
  const timeSinceMatchText = formatTimeSinceMatch(timeSinceMatch);
  return {
    ...match,
    timeSinceMatch: timeSinceMatchText,
  };
}


function formatTimeSinceMatch(timeSinceMatch: number) {
  if (timeSinceMatch < 60) {
    return `${timeSinceMatch} second${timeSinceMatch !== 1 ? 's' : ''} ago`;
  } else if (timeSinceMatch < 60 * 60) {
    const minutes = Math.floor(timeSinceMatch / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (timeSinceMatch < 24 * 60 * 60) {
    const hours = Math.floor(timeSinceMatch / (60 * 60));
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(timeSinceMatch / (24 * 60 * 60));
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}

function formatGameDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function getQueueNameById(queueId: any, queueData: any[]) {
  const queue = queueData.find(q => q.queueId === queueId);
  return queue ? queue.description : 'Unknown';
}

function getSummonerSpellNameById(summonerSpellId: number, summonerSpellData: any) {
  const summonerSpellName = summonerSpellData[summonerSpellId];
  return summonerSpellName || 'Unknown';
}

// Move the summonerLiveResponse fetching inside a separate function
async function fetchSummonerLive(apiKey: any, summonerId: any, modifiedRegion: any) {
  const summonerLiveResponse = await fetch(`https://${modifiedRegion}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${apiKey}`);

  if (summonerLiveResponse.ok) {
    return await summonerLiveResponse.json();
  } else if (summonerLiveResponse.status === 404) {
    console.log('Summoner is not in a game');
    return null;
  } else {
    throw new Error('Failed to fetch summoner live data');
  }
}

// Inside your main handler
// const summonerLive = await fetchSummonerLive(apiKey, summonerData.summonerId, modifiedRegion);

function getQueueInfo(queueType: QueueType, leagueData: any[]): QueueInfo | null {
  const queueData = leagueData.find((queue) => queue.queueType === queueType);
  if (!queueData) {
    return null;
  }
  
  const { tier, rank, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak } = queueData;

  return {
    queueType,
    tier,
    rank,
    leaguePoints,
    wins,
    losses,
    veteran,
    inactive,
    freshBlood,
    hotStreak,
  };
}

function updatePlayerStreaksAndChips(filteredMatchData: any[], playerChips: any[]) {
  const sortedMatchData2 = filteredMatchData.sort((a, b) => b?.gameEndTimestamp - a?.gameEndTimestamp);
  const matchOutcomes = sortedMatchData2.map(match => match?.win ? "Victory" : "Defeat");
  const reversedMatchOutcomes = matchOutcomes.slice().reverse();

  const calculateStreak = (outcome: string) => reversedMatchOutcomes.reduce((streak, currentOutcome) => currentOutcome === outcome ? streak + 1 : 0, 0);

  const currentLossStreak = calculateStreak("Defeat");
  const currentWinStreak = calculateStreak("Victory");

  if (currentLossStreak >= 3) {
    playerChips.push({
      name: "Cold Streak",
      desc: `${currentLossStreak} Cold Streak`,
      icon: 'AcUnit',
      color: '#3174fa',
    });
  }

  if (currentWinStreak >= 3) {
    playerChips.push({
      name: "Hot Streak",
      desc: `${currentWinStreak} Hot Streak`,
      icon: 'WhatshotIcon',
      color: '#ff4e50'
    });
  }

  playerChips.push({
    name: "Viola",
    desc: `Viola creator`,
    icon: 'WhatshotIcon',
    color: '#ff4e50'
  });
  playerChips.push({
    name: "S12 Diamond",
    desc: `Cold Streak`,
    icon: null,
    color: '#3174fa',
  });
  playerChips.push({
    name: "S11 Diamond",
    desc: `Cold Streak`,
    icon: null,
    color: '#3174fa',
  });
  playerChips.push({
    name: "S13-1 Master",
    desc: `Viola creator`,
    icon: null,
    color: '#ff4e50'
  });

  // Add other player chips here...
}

async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to be handled in the caller function
  }
}


export default handler;
