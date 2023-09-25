import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import RateLimit from 'axios-rate-limit'; // For rate limiting
import NodeCache from 'node-cache'; // For caching
import axiosRetry from 'axios-retry';
import { MongoClient } from 'mongodb';

// ... (previous code)
const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');

const RIOT_API_KEY = process.env.RIOT_API_KEY!;

const BASE_URL = 'https://{region}.api.riotgames.com'; // Use a placeholder for region

const cache = new NodeCache({ stdTTL: 6000 }); // Cache with 10-minute expiration


// Existing rate-limited axios instance
const axiosWithRateLimit = RateLimit(axios.create(), {
  maxRequests: 500000,
  perMilliseconds: 10, // 10 seconds in milliseconds
});
// const axiosWithRateLimit = RateLimit(axios.create(), {
//   maxRequests: 500,
//   perMilliseconds: 10000, // 10 seconds in milliseconds
// });

// Configure retries
axiosRetry(axiosWithRateLimit, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  },
  retryCondition: (error) => {
    return error.response?.status === 429;
  },
});


interface Participant {
  championId: string;
  win: boolean;
  championName: string;
  // ... other fields
}

interface MatchResponseData {
  matchId: any;
  // ... other properties
  info: {
    participants: any;
    // ... other properties you expect inside info
  };
}
const regions = ['jp1']; // Add more regions if needed
const tiers = ['DIAMOND']; // Add more tiers if needed
const divisions = ['I']; // Add more divisions if needed
// const regions = ['br1', 'eun1', 'euw1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'tr1', 'ru', 'ph2', 'sg2', 'th2', 'tw2', 'vn2']; // Add more regions if needed
// const tiers = ['DIAMOND', 'EMERALD', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'IRON']; // Add more tiers if needed
// const divisions = ['I', 'II', 'III', 'IV']; // Add more divisions if needed

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

// Existing import statements and configurations remain the same
const championWinRates: { [championId: string]: { championName: string, wins: number, totalGames: number } } = {};

// Helper function to update champion win rates
const updateChampionWinRates = (participants: Array<{championId: string, championName: string, win: boolean}>) => {
  for (const participant of participants) {
    const { championId, win, championName } = participant;

    if (championWinRates[championId]) {
      championWinRates[championId].totalGames += 1;
      if (win) championWinRates[championId].wins += 1;
    } else {
      championWinRates[championId] = { wins: win ? 1 : 0, totalGames: 1,championName };
    }
  }
};

// Print champion win rates
const printChampionWinRates = () => {
  console.log("Champion Win Rates:");
  for (const [championId, stats] of Object.entries(championWinRates)) {
    const winRate = (stats.wins / stats.totalGames) * 100;
    console.log(`Champion ID: ${stats.championName}, Win Rate: ${winRate.toFixed(2)}% ${stats.totalGames} games`);
  }
};

// Helper Functions
const fetchSummoner = async (regionBaseUrl: string, summonerId: string) => {
  return axiosWithRateLimit.get(
    `${regionBaseUrl}/lol/summoner/v4/summoners/${summonerId}`,
    { headers: { 'X-Riot-Token': RIOT_API_KEY } }
  );
};

const fetchLeagueEntries = async (regionBaseUrl: string, tier: string, division: string) => {
  return axiosWithRateLimit.get(
    `${regionBaseUrl}/lol/league/v4/entries/RANKED_SOLO_5x5/${tier}/${division}`,
    { headers: { 'X-Riot-Token': RIOT_API_KEY } }
  );
};

const fetchMatchList = async (regionPlatformId: string, accountId: string, count: number) => {
  return axiosWithRateLimit.get(
    `https://${regionPlatformId}.api.riotgames.com/lol/match/v5/matches/by-puuid/${accountId}/ids?queue=420&type=ranked&start=0&count=${count}`,
    { headers: { 'X-Riot-Token': RIOT_API_KEY } }
  );
};

const fetchMatchDetails = async (regionPlatformId: string, matchId: string) => {
  return axiosWithRateLimit.get<MatchResponseData>(
    `https://${regionPlatformId}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    { headers: { 'X-Riot-Token': RIOT_API_KEY } }
  );
};

// Main handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Flush the headers to establish a connection with the client

    console.log('Starting the function');
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('riotGames');
    const collection = db.collection('matches');
    const allMatches: any = {}; // Initialize empty object
    const seenMatchIds = new Set<string>();

    for (const region of regions) {
      const regionBaseUrl = BASE_URL.replace('{region}', region);
      allMatches[region] = {};
      const regionPlatformId = platformToRegionMap[region.toUpperCase()];

      for (const tier of tiers) {
        allMatches[region][tier] = {};
        for (const division of divisions) {
          const cacheKey = `${region}-${tier}-${division}`;
          const cachedData = cache.get(cacheKey);

          if (cachedData) {
            allMatches[region][tier][division] = cachedData;
            continue;
          }

          const leagueEntriesResponse = await fetchLeagueEntries(regionBaseUrl, tier, division);
          let matchDetailsPromises: Promise<MatchResponseData>[] = [];
          // const matchDetailsPromises: Promise<MatchResponseData>[] = [];

          for (const entry of leagueEntriesResponse.data) {
            // Fetch all match details in parallel
            const summonerResponse = await fetchSummoner(regionBaseUrl, entry.summonerId);
            const accountId = summonerResponse.data.puuid;
            
            const matchListResponse = await fetchMatchList(regionPlatformId, accountId, 20);
            console.log("matchlist", "user " + summonerResponse.data.name, region,tier,division)
            printChampionWinRates()
      
            const fetchPromises = matchListResponse.data.map(matchId => {
              if (seenMatchIds.has(matchId)) {
                console.log("skipped duplicated match");
                return Promise.resolve(null);  // Resolve immediately
              }
              seenMatchIds.add(matchId);
              return fetchMatchDetails(regionPlatformId, matchId);
            });
      
            const newMatchDetails = await Promise.all(fetchPromises);
            newMatchDetails.forEach(matchResponse => {
              if (matchResponse) {
                updateChampionWinRates(matchResponse.data.info.participants);
              }
            });
      
            matchDetailsPromises = matchDetailsPromises.concat(fetchPromises);
          }
      
          const matchDetails = await Promise.all(matchDetailsPromises);
          cache.set(cacheKey, matchDetails);
          allMatches[region][tier][division] = matchDetails;
        }
      }
    }

    await collection.insertOne(allMatches);
    res.json(allMatches);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await client.close();
  }
};

export default handler;
