import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import RateLimit from 'axios-rate-limit'; // For rate limiting
import NodeCache from 'node-cache'; // For caching

// ... (previous code)

const RIOT_API_KEY = 'RGAPI-70e20392-19ee-4299-acf3-23d42e90fac9';
const BASE_URL = 'https://{region}.api.riotgames.com'; // Use a placeholder for region

const cache = new NodeCache({ stdTTL: 6000 }); // Cache with 10-minute expiration

// Create an instance of axios with rate limiting
const axiosWithRateLimit = RateLimit(axios.create(), {
  maxRequests: 20, // Maximum number of requests per 1 second
  perMilliseconds: 1000, // 1 second
});

interface MatchResponseData {
  // Define the structure of the match response data here
  // For example:
  matchId: any;
  // Other properties...
}
const regions = ['br1', 'eun1', 'euw1']; // Add more regions if needed
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allMatches = {};

    for (const region of regions) {
      const regionBaseUrl = BASE_URL.replace('{region}', region); // Replace placeholder with current region
      if (!allMatches[region]) {
        allMatches[region] = {};
      }

      const regionPlatformId = platformToRegionMap[region.toUpperCase()]; // Get the platform ID based on the region
      console.log(`Region Platform ID for ${region}: ${regionPlatformId}`);

      for (const tier of tiers) {
        if (!allMatches[region][tier]) {
          allMatches[region][tier] = {};
        }

        for (const division of divisions) {
          const cacheKey = `${region}-${tier}-${division}`;
          const cachedData = cache.get(cacheKey);
          if (cachedData) {
            allMatches[region][tier][division] = cachedData;
            continue;
          }

          const leagueEntriesResponse = await axiosWithRateLimit.get(
            `${regionBaseUrl}/lol/league/v4/entries/RANKED_SOLO_5x5/${tier}/${division}`,
            {
              headers: {
                'X-Riot-Token': RIOT_API_KEY,
              },
            }
          );

          const matchDetailsPromises: Promise<MatchResponseData>[] = []; // Declare matchDetailsPromises here

          for (const entry of leagueEntriesResponse.data) {
            try {
              const summonerResponse = await axiosWithRateLimit.get(
                `${regionBaseUrl}/lol/summoner/v4/summoners/${entry.summonerId}`,
                {
                  headers: {
                    'X-Riot-Token': RIOT_API_KEY,
                  },
                }
              );

              const accountId = summonerResponse.data.puuid;

              const matchlistResponse = await axiosWithRateLimit.get(
                `https://${regionPlatformId}.api.riotgames.com/lol/match/v5/matches/by-puuid/${accountId}/ids`,
                {
                  headers: {
                    'X-Riot-Token': RIOT_API_KEY,
                  },
                }

              );

console.log("matchlist", region,tier,division)
              for (const matchId of matchlistResponse.data) {
                const matchResponse = await axiosWithRateLimit.get<MatchResponseData>(
                  `https://${regionPlatformId}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
                  {
                    headers: {
                      'X-Riot-Token': RIOT_API_KEY,
                    },
                  }
                );
                matchDetailsPromises.push(Promise.resolve(matchResponse.data));
              }
            } catch (error) {
              if (error.response && error.response.status === 429) {
                // Rate limit exceeded, wait for the retry-after duration
                const retryAfter = parseInt(error.response.headers['retry-after']) || 1;
                await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
              } else {
                console.error('Error fetching match details:', error);
              }
            }
          }

          const matchDetails = await Promise.all(matchDetailsPromises);
          cache.set(cacheKey, matchDetails);
          allMatches[region][tier][division] = matchDetails;
        }
      }
    }

    res.json(allMatches);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export default handler;