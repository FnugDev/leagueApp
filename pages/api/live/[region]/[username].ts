import { NextApiRequest, NextApiResponse } from 'next';
import { Client, Summoner, Region } from 'shieldbow';
import fetch from 'node-fetch';
import queueData from './queues.json'; // Import the queues.json file
import summonerSpellData from './summonerSpells.json'; // Import the queues.json file

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


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = 'RGAPI-815d07e4-4824-4c41-9c6d-61e15eb6ebf0';
  const region = (_req.query.region as string).toUpperCase() as keyof typeof platformToRegionMap;
  const summonerName = _req.query.username as string;
  const platform = platformToRegionMap[region];
 

  try {
    // const summonerName = 'fnug';
    const summonerResponse = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
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

    const summonerLeagueV4 = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.summonerId}?api_key=${apiKey}`);
    if (!summonerLeagueV4.ok) {
      throw new Error('not in game ');
    }

    const summonerLiveResponse = await fetch(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerData.summonerId}?api_key=${apiKey}`);
    if (!summonerLiveResponse.ok) {
      throw new Error('Failed to fetch summoner leagueV4');
    }

    const summonerLive = await summonerLiveResponse.json();
    
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


    const matchesResponse = await fetch(`https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=20&api_key=${apiKey}`);
    if (!matchesResponse.ok) {
      throw new Error('Failed to fetch match data');
    }
    const matches: string[] = await matchesResponse.json();

    const matchData = await fetchMatchData(matches, apiKey, summonerData.puuid, platform);


    const filteredMatchData = matchData.filter(match => match !== null);

    // const championStats: ChampionStats = calculateChampionStats(filteredMatchData, summonerData.summonerId);

    res.status(200).json({ summonerData, summonerLive });
  } catch (error) {
    console.error('Error fetching summoner:', error);
    res.status(500).json({ message: 'Failed to fetch summoner data' });
  }
};

async function fetchMatchData(matches: any[], apiKey: string, puuid: any, platform: string) {
  const currentTime = Date.now();

  const matchPromises = matches.map(async (matchId: any) => {
    try {
      const response = await fetch(`https://${platform}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch match ${matchId}`);
      }
      const gameData = await response.json();

      const participant = gameData.info.participants.find((p: { puuid: any; }) => p.puuid === puuid);
      if (!participant) {
        console.log(`Participant for summoner not found in match ${matchId}`);
        return null;
      }

      const { win, kills, deaths, assists, championName, championId, summoner1Id, summoner2Id, item0, item1, item2, item3, item4, item5 } = participant;
      const { gameMode, gameId, gameCreation, gameEndTimestamp, gameDuration } = gameData.info;

      const queueName = getQueueNameById(gameData.info.queueId, queueData);

      const summoner1Name = getSummonerSpellNameById(summoner1Id, summonerSpellData);
      const summoner2Name = getSummonerSpellNameById(summoner2Id, summonerSpellData);

      const timeSinceMatch = Math.floor((currentTime - gameEndTimestamp) / 1000);
      const timeSinceMatchText = formatTimeSinceMatch(timeSinceMatch);

      const formattedGameDuration = formatGameDuration(gameDuration);

      return {
        matchId,
        game_mode: gameMode,
        queueId: gameData.info.queueId,
        queueName,
        win,
        kills,
        deaths,
        assists,
        champion_name: championName,
        championId,
        summoner1Id,
        summoner1Name,
        summoner2Name,
        items: { item0, item1, item2, item3, item4, item5 },
        timeSinceMatch: timeSinceMatchText,
        gameDuration: formattedGameDuration,
      };
    } catch (error) {
      console.error(`Error fetching match ${matchId}:`, error);
      return null;
    }
  });

  return Promise.all(matchPromises);
}


// function calculateChampionStats(matchData: any[], summonerId: string): ChampionStats {
//   const championStats: ChampionStats = {};

//   matchData.forEach((matchEntry) => {
//     console.log(matchEntry)

//     championStats[matchEntry.championId] = championStats[matchEntry.championId] || { gamesPlayed: 0, wins: 0 };
//     championStats[matchEntry.championId].gamesPlayed++;
//     if (matchEntry.win) {
//       championStats[matchEntry.championId].wins++;
//     }
    
//   });

//   Object.keys(championStats).forEach((championId) => {
//     const id = parseInt(championId);
//     championStats[id].winRate = (championStats[id].wins / championStats[id].gamesPlayed) * 100;
//   });

//   return championStats;
// }

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

export default handler;
