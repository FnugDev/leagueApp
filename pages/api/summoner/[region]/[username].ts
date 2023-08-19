import { NextApiRequest, NextApiResponse } from 'next';
import { Client, Summoner, Region } from 'shieldbow';
import fetch from 'node-fetch';
import queueData from './queues.json'; // Import the queues.json file
import summonerSpellData from './summonerSpells.json'; // Import the queues.json file
import cache from 'memory-cache';
import OpenAIApi from 'openai';



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

type ChampionStats = {
  [champion_name: string]: {
    gamesPlayed: number;
    wins: number;
    winRate: number;
  };
};

interface PlayerChip {
  name: string;
  desc: string;
  icon: any;
  color: string;
}

const playerChips: PlayerChip[] = [];

// async function generateSuggestionsForImprovement(newMatchData: any[]) {
//   // Accumulate and analyze participant data from all matches
//   const aggregatedParticipantData = newMatchData.map(match => match.participant);
//   // Process and analyze the aggregated data as needed

//   // Convert the aggregated participant data to a text format for analysis
//   const analysisText = JSON.stringify(aggregatedParticipantData, null, 2);

//   // Initialize the OpenAI API client with your API key

//   const apiKey = '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';
//   const openai = new OpenAIApi({ apiKey: apiKey });

//   // Compose the prompt for OpenAI
//   const prompt = `Based on your recent matches, here are some suggestions to help you improve your performance:\n\nAnalyze the following participant data:\n${analysisText}`;

//   // Use the OpenAI API to generate suggestions
//   const response = await openai.complete(prompt);
//   const chat_completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "Hello world" }],
// });


//   return response.choices[0].text;
// }


const CACHE_DURATION = 1 * 60 * 1000;
const MAX_MATCH_HISTORY_COUNT = 19; 
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = 'RGAPI-70e20392-19ee-4299-acf3-23d42e90fac9';
  const region = _req.query.region as RegionCode;
  const summonerName = _req.query.username as string;
  const modifiedRegion = regionCodeMap[region] as PlatformCode;

  if (!modifiedRegion) {
    return res.status(400).json({ message: 'Invalid region code.' });
  }
  
  const plat = platformToRegionMap[modifiedRegion];
  if (!plat) {
    return res.status(400).json({ message: 'Invalid region code.' });
  }
  
  const platform = plat.toUpperCase();
  const cacheKey = `${modifiedRegion}-${summonerName}`;
  


  console.log("chip")
  
  try {
    // const summonerName = 'fnug';
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
      console.log('Data fetched from cache');

    }
console.log("hello")
    const summonerResponse = await fetch(`https://${modifiedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
    if (!summonerResponse.ok) {
      throw new Error('Failed to fetch summoner data');
    }

    const summoner = await summonerResponse.json();

    const summonerData = {
      name: summoner.name,
      level: summoner.summonerLevel,
      accountId: summoner.accountId,
      summonerId: summoner.id,
      puuid: summoner.puuid,
      profileIcon: summoner.profileIconId,
    };

    const summonerLeagueV4 = await fetch(`https://${modifiedRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.summonerId}?api_key=${apiKey}`);
    if (!summonerLeagueV4.ok) {
      throw new Error('Failed to fetch summoner leagueV4');
    }
    
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

   

    const leagueV4 = await summonerLeagueV4.json();

    const soloQueueData = leagueV4.find((queue: { queueType: string; }) => queue.queueType === 'RANKED_SOLO_5x5');

    // Get Flex Queue data (if available)
    const flexQueueData = leagueV4.find((queue: { queueType: string; }) => queue.queueType === 'RANKED_FLEX_SR');

    // Check if Solo Queue data exists and store its properties
    const soloQueueInfo = soloQueueData
      ? {
          queueType: soloQueueData.queueType,
          tier: soloQueueData.tier,
          rank: soloQueueData.rank,
          leaguePoints: soloQueueData.leaguePoints,
          wins: soloQueueData.wins,
          losses: soloQueueData.losses,
          veteran: soloQueueData.veteran,
          inactive: soloQueueData.inactive,
          freshBlood: soloQueueData.freshBlood,
          hotStreak: soloQueueData.hotStreak,
        }
      : null;

    // Check if Flex Queue data exists and store its properties
    const flexQueueInfo = flexQueueData
      ? {
          queueType: flexQueueData.queueType,
          tier: flexQueueData.tier,
          rank: flexQueueData.rank,
          leaguePoints: flexQueueData.leaguePoints,
          wins: flexQueueData.wins,
          losses: flexQueueData.losses,
          veteran: flexQueueData.veteran,
          inactive: flexQueueData.inactive,
          freshBlood: flexQueueData.freshBlood,
          hotStreak: flexQueueData.hotStreak,
        }
      : null;


 
   

    // Fetch new match history
    const matchesResponse = await fetch(`https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=${MAX_MATCH_HISTORY_COUNT}&api_key=${apiKey}`);
    if (!matchesResponse.ok) {
      throw new Error('Failed to fetch match data');
    }
    const newMatches: string[] = await matchesResponse.json();

    // If cache is empty or doesn't have match history, populate it with fetched match data
    if (!cachedData || !cachedData.matchHistory) {
      const newMatchData = await fetchMatchData(newMatches, apiKey, summonerData.puuid, platform);
      const championStats: ChampionStats = calculateChampionStats(newMatchData);
//       const improvementSuggestionsText = await generateSuggestionsForImprovement(newMatchData);
// console.log(improvementSuggestionsText);
      cache.put(cacheKey, {
        summonerData,
        playerChips,
        soloQueueInfo,
        flexQueueInfo,
        championStats,
        matchHistory: newMatchData,
      }, CACHE_DURATION);
      return res.status(200).json({
        summonerData,
        playerChips,
        soloQueueInfo,
        flexQueueInfo,
        championStats,
        matchHistory: newMatchData,
      });
    }

    // Compare with previously stored match IDs to identify new matches
    const storedMatches = cachedData.matchHistory || [];
    const newMatchesToFetch = newMatches.filter(matchId => !storedMatches.includes(matchId));

    // Fetch and update data for new matches
    const newMatchData = await fetchMatchData(newMatchesToFetch, apiKey, summonerData.puuid, platform);
    const updatedMatchHistory = [...newMatchData, ...(cachedData.matchHistory || [])];
    const championStats: ChampionStats = calculateChampionStats(updatedMatchHistory);
    // Store the updated data
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
      matchHistory: updatedMatchHistory 
    });

  } catch (error) {
    console.error('Error fetching summoner:', error);
    res.status(500).json({ message: 'Failed to fetch summoner data' });
  }
};

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

async function fetchMatchData(matches: any[], apiKey: string, puuid: any, platform: string) {
  const currentTime = Date.now();
  playerChips.length = 0;

  const matchOutcomes: string[] = []; 
  

  const matchPromises = matches.map(async (matchId: any) => {
    try {
      const gameData = await retryableFetch(
        `https://${platform}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`,
        0, // Initial retry count
        5 // The maximum number of retries you want
      );
      // const gameData = await response.json();

      // Filter out matches with queueId 1700
      if (gameData.info.queueId === 1700) {
        return null; // Skip this match
      }

      const participant = gameData.info.participants.find((p: { puuid: any; }) => p.puuid === puuid);
      if (!participant) {
        console.log(`Participant for summoner not found in match ${matchId}`);
        return null;
      }

      const { win, kills, deaths, assists, championName, championId, summoner1Id, summoner2Id, item0, item1, item2, item3, item4, item5, perks, totalMinionsKilled, teamEarlySurrendered, teamId,teamPosition } = participant;
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



      return {
        
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
        participant,
      };
    } catch (error) {
      console.error(`Error fetching match ${matchId}:`, error);
      return null;
    }
  });

  const matchData = await Promise.all(matchPromises);


  // Filter out null and undefined matches
  const filteredMatchData = matchData.filter(match => match !== null && match !== undefined);


  // Sort filteredMatchData by gameEndTimestamp
  const sortedMatchData = filteredMatchData.sort((a, b) => b?.gameEndTimestamp - a?.gameEndTimestamp);

  // Populate matchOutcomes array using sortedMatchData
  sortedMatchData.forEach(match => {
    matchOutcomes.push(match?.win ? "Victory" : "Defeat");
  });
  
  // Reverse matchOutcomes array
  const reversedMatchOutcomes = matchOutcomes.slice().reverse();
  
  // Calculate current loss streak using reversedMatchOutcomes array
  const currentLossStreak = reversedMatchOutcomes.reduce((streak, outcome) => outcome === "Defeat" ? streak + 1 : 0, 0);
  if (currentLossStreak >= 3) {
    playerChips.push({
      name: "Cold Streak",
      desc: `${currentLossStreak} Cold Streak`,
      icon: 'AcUnit',
      color: '#3174fa',
    });
    console.log("pushed chip")
  }

  const currentWinStreak = reversedMatchOutcomes.reduce((streak, outcome) => outcome === "Victory" ? streak + 1 : 0, 0);
  if (currentWinStreak >= 3) {

    playerChips.push({
      name: "Hot Streak",
      desc: `${currentWinStreak} Hot Streak`,
      icon: 'WhatshotIcon',
      color: '#ff4e50'
    });
    console.log("pushed chip")
  }

  
  
  console.log(playerChips)

  return filteredMatchData;
}
async function getMatchData(apiKey: string, puuid: any, platform: string) {
  // Set your API key, puuid, and platform


  // Get the matches
  const matchesResponse = await fetch(`https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=19&api_key=${apiKey}`);
  if (!matchesResponse.ok) {
    throw new Error('Failed to fetch match data');
  }
  const matches: string[] = await matchesResponse.json();

  // Fetch the match data using the fetchMatchData function
  const matchData = await fetchMatchData(matches, apiKey, puuid, platform);

  // Filter out any null values
  const filteredMatchData = matchData.filter(match => match !== null);

  // Do something with the match data
  console.log(filteredMatchData);
}



function calculateChampionStats(matchData: any[]): ChampionStats {
  const championStats: ChampionStats = {};

  matchData.forEach((matchEntry) => {
    championStats[matchEntry.champion_name] = championStats[matchEntry.champion_name] || { gamesPlayed: 0, wins: 0 };
    championStats[matchEntry.champion_name].gamesPlayed++;
    if (matchEntry.win) {
      championStats[matchEntry.champion_name].wins++;
    }
  });

  const sortedChampionStats: ChampionStats = {};
  Object.entries(championStats)
    .map(([champion_name, stats]) => ({ champion_name, ...stats }))
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed) // Sort in descending order of games played
    .forEach((entry) => {
      sortedChampionStats[entry.champion_name] = {
        gamesPlayed: entry.gamesPlayed,
        wins: entry.wins,
        winRate: (entry.wins / entry.gamesPlayed) * 100,
      };
    });

  return sortedChampionStats;
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



export default handler;
