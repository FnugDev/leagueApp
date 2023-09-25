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
// const axiosWithRateLimit = RateLimit(axios.create(), {
//   maxRequests: 2000,
//   perMilliseconds: 10000, // 10 seconds in milliseconds
// });
// const axiosWithRateLimit = RateLimit(axios.create(), {
//   maxRequests: 500,
//   perMilliseconds: 10000, // 10 seconds in milliseconds
// });

const axiosWithRateLimit = RateLimit(axios.create({
  timeout: 30000, // set timeout to 30 seconds
}), {
  maxRequests: 500,
  perMilliseconds: 10000,
});
// Configure retries
axiosRetry(axiosWithRateLimit, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 10000; // time interval between retries
  },
  retryCondition: (error) => {
    return error.response?.status === 429 || error.code === 'ECONNABORTED';
  },
});


interface Participant {
  championId: string;
  win: boolean;
  championName: string;
  // ... other fields
}



interface MatchResponseData {
  info: any;
  matchId: any;
  data: {
    info: {
      participants: any;
      // ... other properties you expect inside info
    };
  };
}
const regions = ['jp1','oc1']; // Add more regions if needed
const tiers = ['DIAMOND']; // Add more tiers if needed
const divisions = ['I','II']; // Add more divisions if needed
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
// const updateChampionWinRates = (participants: Array<{championId: string, championName: string, win: boolean}>) => {
//   for (const participant of participants) {
//     const { championId, win, championName } = participant;

//     if (championWinRates[championId]) {
//       championWinRates[championId].totalGames += 1;
//       if (win) championWinRates[championId].wins += 1;
//     } else {
//       championWinRates[championId] = { wins: win ? 1 : 0, totalGames: 1,championName };
//     }
//   }
// };
const winRatesByRegionTierDivision: any = {};

// Update this function to also include region, tier, and division
const updateChampionWinRates = (participants: Array<{championId: string, championName: string, win: boolean}>, region: string, tier: string, division: string) => {
  if (!winRatesByRegionTierDivision[region]) {
    winRatesByRegionTierDivision[region] = {};
  }
  if (!winRatesByRegionTierDivision[region][tier]) {
    winRatesByRegionTierDivision[region][tier] = {};
  }
  if (!winRatesByRegionTierDivision[region][tier][division]) {
    winRatesByRegionTierDivision[region][tier][division] = {};
  }

  for (const participant of participants) {
    const { championId, win, championName } = participant;

    if (!winRatesByRegionTierDivision[region][tier][division][championId]) {
      winRatesByRegionTierDivision[region][tier][division][championId] = { wins: 0, totalGames: 0, championName: championName };
    }

    winRatesByRegionTierDivision[region][tier][division][championId].totalGames += 1;
    if (win) {
      winRatesByRegionTierDivision[region][tier][division][championId].wins += 1;
    }
  }
};


// Print champion win rates
// const printChampionWinRates = () => {
//   console.log("Champion Win Rates:");
//   for (const [championId, stats] of Object.entries(championWinRates)) {
//     const winRate = (stats.wins / stats.totalGames) * 100;
//     console.log(`Champion ID: ${stats.championName}, Win Rate: ${winRate.toFixed(2)}% ${stats.totalGames} games`);
//   }
// };
const printChampionWinRates = () => {
  console.log("Champion Win Rates:", JSON.stringify(winRatesByRegionTierDivision, null, 2));
};


// Helper Functions
const fetchSummoner = async (regionBaseUrl: string, summonerId: string) => {
  try {
    const response = await axiosWithRateLimit.get(
      `${regionBaseUrl}/lol/summoner/v4/summoners/${summonerId}`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY } }
    );
    return response.data;
  } catch (error) {
    handleError(error, `fetchSummoner failed for summonerId: ${summonerId}`);
    return null;
  }
};

const fetchLeagueEntries = async (regionBaseUrl: string, tier: string, division: string) => {
  try {
    const response = await axiosWithRateLimit.get(
      `${regionBaseUrl}/lol/league/v4/entries/RANKED_SOLO_5x5/${tier}/${division}`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY } }
    );
    return response.data;
  } catch (error) {
    handleError(error, `fetchLeagueEntries failed for tier: ${tier}, division: ${division}`);
    return null;
  }
};

const fetchMatchList = async (regionPlatformId: string, accountId: string, count: number) => {
  try {
    const response = await axiosWithRateLimit.get(
      `https://${regionPlatformId}.api.riotgames.com/lol/match/v5/matches/by-puuid/${accountId}/ids?queue=420&type=ranked&start=0&count=${count}`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY } }
    );
    return response.data;
  } catch (error) {
    handleError(error, `fetchMatchList failed for accountId: ${accountId}`);
    return null;
  }
};

const fetchMatchDetails = async (regionPlatformId: string, matchId: string): Promise<MatchResponseData | null> => {
  try {
    const response = await axiosWithRateLimit.get<MatchResponseData>(
      `https://${regionPlatformId}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      { headers: { 'X-Riot-Token': RIOT_API_KEY }, timeout: 10000 }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['Retry-After'], 10);
        console.log(`Rate limited. Retrying in ${retryAfter} seconds.`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        return await fetchMatchDetails(regionPlatformId, matchId);  // retry
      } else if (error.response?.status === 404) {
        console.log(`Match not found for matchId: ${matchId}`);
        return null;
      } else if (error.code === 'ECONNABORTED') {
        console.log(`A timeout happened on matchId: ${matchId}`);
        return null;
      }
    }
    // re-throw the error if it's not a 429, 404, or a timeout
    throw error;
  }
};


const handleError = (error: any, message: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      console.log(`${message}, Status: 404 Not Found`);
    } else if (error.code === 'ECONNABORTED') {
      console.log(`${message}, Code: Timeout`);
    } else {
      console.log(`${message}, Status: ${error.response?.status}, Message: ${error.response?.data}`);
    }
  } else {
    console.log(`${message}, Error: ${error.message}`);
  }
};


async function executeInBatch<T>(promises: Promise<T>[], batchSize: number): Promise<T[]> {
  let results: T[] = [];
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch);
    results = [...results, ...batchResults];
  }
  return results;
}

// Main handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let clientConnected = false;
  const hasLoopRun: { [region: string]: { [tier: string]: { [division: string]: boolean } } } = {};
  try {


      await client.connect();
      console.log('Connected to MongoDB');

    clientConnected = true; // Set flag to true
    const db = client.db('riotGames');
    const collection = db.collection('matches');
    const winRateCollection = db.collection('winRates');

    const allMatches: any = {}; // Initialize empty object
    const seenMatchIds = new Set<string>();

// Existing code ...

for (const region of regions) {
  const regionBaseUrl = BASE_URL.replace('{region}', region);
  allMatches[region] = {};
  if (!hasLoopRun[region]) hasLoopRun[region] = {};
  const regionPlatformId = platformToRegionMap[region.toUpperCase()];

  for (const tier of tiers) {
    allMatches[region][tier] = {};
    if (!hasLoopRun[region][tier]) hasLoopRun[region][tier] = {};
    for (const division of divisions) {
      if (hasLoopRun[region][tier][division]) {
        console.log(`Skipping completed loop for ${region}, ${tier}, ${division}`);
        continue;
      }


      // Fetch league entries
      const leagueEntriesResponse = await fetchLeagueEntries(regionBaseUrl, tier, division);

      // Gather promises to fetch all summoners in parallel
      const summonerPromises = leagueEntriesResponse.map(entry => fetchSummoner(regionBaseUrl, entry.summonerId));

      // Resolve all summoner fetching promises
      const summonerResponses = await Promise.all(summonerPromises);

      // Gather and resolve promises to fetch all matches in parallel for each summoner
      let matchDetailsPromises: Promise<MatchResponseData>[] = [];
      for (const summonerResponse of summonerResponses) {
        const accountId = summonerResponse.puuid;
        const matchListResponse = await fetchMatchList(regionPlatformId, accountId, 1);
        console.log("matchlist", "user " + summonerResponse.name, region,tier,division)

        const fetchPromises = matchListResponse.map(matchId => {
          if (seenMatchIds.has(matchId)) {
            console.log("skipped duplicated match");
            return Promise.resolve(null);
          }

          seenMatchIds.add(matchId);
          return fetchMatchDetails(regionPlatformId, matchId);
        });
        
        matchDetailsPromises.push(...fetchPromises);
      }
      
      // const matchDetails = await Promise.allSettled(matchDetailsPromises);
      const batchedMatchDetails = await executeInBatch(
        matchDetailsPromises.map(
          p => p
            .then(v => ({ status: 'fulfilled' as const, value: v }) as PromiseSettledResult<MatchResponseData>)
            .catch(e => ({ status: 'rejected' as const, reason: e }) as PromiseSettledResult<MatchResponseData>)
        ),
        10
      );
      
      batchedMatchDetails.forEach((result: PromiseSettledResult<MatchResponseData>) => {
        if (result.status === 'fulfilled') {
          if (result.value && result.value.info) {
            // updateChampionWinRates(result.value.info.participants);
            // console.log("calue yes?", result); // Debug log
            updateChampionWinRates(result.value.info.participants, region, tier, division);

          }
        } else if (result.status === 'rejected') {
          console.error('Rejected promise:', result.reason);
        }
      });    
      
      printChampionWinRates();
      hasLoopRun[region][tier][division] = true; // Mark as completed
      allMatches[region][tier][division] = batchedMatchDetails;
    }
  }
}

const allLoopsCompleted = Object.values(hasLoopRun).every(regionObj =>
  Object.values(regionObj).every(tierObj =>
    Object.values(tierObj).every(divisionBool => divisionBool)
  )
);

if (allLoopsCompleted) {
  console.log('All loops have completed.');
  // ... do something here
} else {
  console.log('Not all loops have completed.');
}
// ... Remaining code

await winRateCollection.insertOne(winRatesByRegionTierDivision);
    // await collection.insertOne(allMatches);
    res.json(winRatesByRegionTierDivision);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await client.close();
  }
};


export default handler;
