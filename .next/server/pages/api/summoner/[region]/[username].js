"use strict";
(() => {
var exports = {};
exports.id = 679;
exports.ids = [679];
exports.modules = {

/***/ 4809:
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ 4986:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _username_)
});

// EXTERNAL MODULE: external "node-fetch"
var external_node_fetch_ = __webpack_require__(4809);
var external_node_fetch_default = /*#__PURE__*/__webpack_require__.n(external_node_fetch_);
;// CONCATENATED MODULE: ./pages/api/summoner/[region]/queues.json
const queues_namespaceObject = JSON.parse('[{"queueId":0,"map":"Custom Game","description":null,"notes":null},{"queueId":2,"map":"Summoner\'s Rift","description":"Blind Pick ","notes":"Deprecated in patch 7.19 in favor of queueId 430"},{"queueId":4,"map":"Summoner\'s Rift","description":"Ranked Solo ","notes":"Deprecated in favor of queueId 420"},{"queueId":6,"map":"Summoner\'s Rift","description":"Ranked Premade ","notes":"Game mode deprecated"},{"queueId":7,"map":"Summoner\'s Rift","description":"Co-op vs AI ","notes":"Deprecated in favor of queueId 32 and 33"},{"queueId":8,"map":"Twisted Treeline","description":"3v3 Normal ","notes":"Deprecated in patch 7.19 in favor of queueId 460"},{"queueId":9,"map":"Twisted Treeline","description":"3v3 Ranked Flex ","notes":"Deprecated in patch 7.19 in favor of queueId 470"},{"queueId":14,"map":"Summoner\'s Rift","description":"Draft Pick ","notes":"Deprecated in favor of queueId 400"},{"queueId":16,"map":"Crystal Scar","description":"Dominion Blind Pick ","notes":"Game mode deprecated"},{"queueId":17,"map":"Crystal Scar","description":"Dominion Draft Pick ","notes":"Game mode deprecated"},{"queueId":25,"map":"Crystal Scar","description":"Dominion Co-op vs AI ","notes":"Game mode deprecated"},{"queueId":31,"map":"Summoner\'s Rift","description":"Co-op vs AI Intro Bot ","notes":"Deprecated in patch 7.19 in favor of queueId 830"},{"queueId":32,"map":"Summoner\'s Rift","description":"Co-op vs AI Beginner Bot ","notes":"Deprecated in patch 7.19 in favor of queueId 840"},{"queueId":33,"map":"Summoner\'s Rift","description":"Co-op vs AI Intermediate Bot ","notes":"Deprecated in patch 7.19 in favor of queueId 850"},{"queueId":41,"map":"Twisted Treeline","description":"3v3 Ranked Team ","notes":"Game mode deprecated"},{"queueId":42,"map":"Summoner\'s Rift","description":"Ranked Team ","notes":"Game mode deprecated"},{"queueId":52,"map":"Twisted Treeline","description":"Co-op vs AI ","notes":"Deprecated in patch 7.19 in favor of queueId 800"},{"queueId":61,"map":"Summoner\'s Rift","description":"Team Builder ","notes":"Game mode deprecated"},{"queueId":65,"map":"Howling Abyss","description":"ARAM ","notes":"Deprecated in patch 7.19 in favor of queueId 450"},{"queueId":67,"map":"Howling Abyss","description":"ARAM Co-op vs AI ","notes":"Game mode deprecated"},{"queueId":70,"map":"Summoner\'s Rift","description":"One for All ","notes":"Deprecated in patch 8.6 in favor of queueId 1020"},{"queueId":72,"map":"Howling Abyss","description":"1v1 Snowdown Showdown ","notes":null},{"queueId":73,"map":"Howling Abyss","description":"2v2 Snowdown Showdown ","notes":null},{"queueId":75,"map":"Summoner\'s Rift","description":"6v6 Hexakill ","notes":null},{"queueId":76,"map":"Summoner\'s Rift","description":"Ultra Rapid Fire ","notes":null},{"queueId":78,"map":"Howling Abyss","description":"One For All: Mirror Mode ","notes":null},{"queueId":83,"map":"Summoner\'s Rift","description":"Co-op vs AI Ultra Rapid Fire ","notes":null},{"queueId":91,"map":"Summoner\'s Rift","description":"Doom Bots Rank 1 ","notes":"Deprecated in patch 7.19 in favor of queueId 950"},{"queueId":92,"map":"Summoner\'s Rift","description":"Doom Bots Rank 2 ","notes":"Deprecated in patch 7.19 in favor of queueId 950"},{"queueId":93,"map":"Summoner\'s Rift","description":"Doom Bots Rank 5 ","notes":"Deprecated in patch 7.19 in favor of queueId 950"},{"queueId":96,"map":"Crystal Scar","description":"Ascension ","notes":"Deprecated in patch 7.19 in favor of queueId 910"},{"queueId":98,"map":"Twisted Treeline","description":"6v6 Hexakill ","notes":null},{"queueId":100,"map":"Butcher\'s Bridge","description":"ARAM ","notes":null},{"queueId":300,"map":"Howling Abyss","description":"Legend of the Poro King ","notes":"Deprecated in patch 7.19 in favor of queueId 920"},{"queueId":310,"map":"Summoner\'s Rift","description":"Nemesis ","notes":null},{"queueId":313,"map":"Summoner\'s Rift","description":"Black Market Brawlers ","notes":null},{"queueId":315,"map":"Summoner\'s Rift","description":"Nexus Siege ","notes":"Deprecated in patch 7.19 in favor of queueId 940"},{"queueId":317,"map":"Crystal Scar","description":"Definitely Not Dominion ","notes":null},{"queueId":318,"map":"Summoner\'s Rift","description":"ARURF ","notes":"Deprecated in patch 7.19 in favor of queueId 900"},{"queueId":325,"map":"Summoner\'s Rift","description":"All Random ","notes":null},{"queueId":400,"map":"Summoner\'s Rift","description":"Draft Pick ","notes":null},{"queueId":410,"map":"Summoner\'s Rift","description":"Ranked Dynamic ","notes":"Game mode deprecated in patch 6.22"},{"queueId":420,"map":"Summoner\'s Rift","description":"Ranked Solo ","notes":null},{"queueId":430,"map":"Summoner\'s Rift","description":"Blind Pick ","notes":null},{"queueId":440,"map":"Summoner\'s Rift","description":"Ranked Flex ","notes":null},{"queueId":450,"map":"Howling Abyss","description":"ARAM ","notes":null},{"queueId":460,"map":"Twisted Treeline","description":"3v3 Blind Pick ","notes":"Deprecated in patch 9.23"},{"queueId":470,"map":"Twisted Treeline","description":"3v3 Ranked Flex ","notes":"Deprecated in patch 9.23"},{"queueId":600,"map":"Summoner\'s Rift","description":"Blood Hunt Assassin ","notes":null},{"queueId":610,"map":"Cosmic Ruins","description":"Dark Star: Singularity ","notes":null},{"queueId":700,"map":"Summoner\'s Rift","description":"Summoner\'s Rift Clash ","notes":null},{"queueId":720,"map":"Howling Abyss","description":"ARAM Clash ","notes":null},{"queueId":800,"map":"Twisted Treeline","description":"Co-op vs. AI Intermediate Bot ","notes":"Deprecated in patch 9.23"},{"queueId":810,"map":"Twisted Treeline","description":"Co-op vs. AI Intro Bot ","notes":"Deprecated in patch 9.23"},{"queueId":820,"map":"Twisted Treeline","description":"Co-op vs. AI Beginner Bot ","notes":null},{"queueId":830,"map":"Summoner\'s Rift","description":"Co-op vs. AI Intro Bot ","notes":null},{"queueId":840,"map":"Summoner\'s Rift","description":"Co-op vs. AI Beginner Bot ","notes":null},{"queueId":850,"map":"Summoner\'s Rift","description":"Co-op vs. AI Intermediate Bot ","notes":null},{"queueId":900,"map":"Summoner\'s Rift","description":"ARURF ","notes":null},{"queueId":910,"map":"Crystal Scar","description":"Ascension ","notes":null},{"queueId":920,"map":"Howling Abyss","description":"Legend of the Poro King ","notes":null},{"queueId":940,"map":"Summoner\'s Rift","description":"Nexus Siege ","notes":null},{"queueId":950,"map":"Summoner\'s Rift","description":"Doom Bots Voting ","notes":null},{"queueId":960,"map":"Summoner\'s Rift","description":"Doom Bots Standard ","notes":null},{"queueId":980,"map":"Valoran City Park","description":"Star Guardian Invasion: Normal ","notes":null},{"queueId":990,"map":"Valoran City Park","description":"Star Guardian Invasion: Onslaught ","notes":null},{"queueId":1000,"map":"Overcharge","description":"PROJECT: Hunters ","notes":null},{"queueId":1010,"map":"Summoner\'s Rift","description":"Snow ARURF ","notes":null},{"queueId":1020,"map":"Summoner\'s Rift","description":"One for All ","notes":null},{"queueId":1030,"map":"Crash Site","description":"Odyssey Extraction: Intro ","notes":null},{"queueId":1040,"map":"Crash Site","description":"Odyssey Extraction: Cadet ","notes":null},{"queueId":1050,"map":"Crash Site","description":"Odyssey Extraction: Crewmember ","notes":null},{"queueId":1060,"map":"Crash Site","description":"Odyssey Extraction: Captain ","notes":null},{"queueId":1070,"map":"Crash Site","description":"Odyssey Extraction: Onslaught ","notes":null},{"queueId":1090,"map":"Convergence","description":"Teamfight Tactics ","notes":null},{"queueId":1100,"map":"Convergence","description":"Ranked Teamfight Tactics ","notes":null},{"queueId":1110,"map":"Convergence","description":"Teamfight Tactics Tutorial ","notes":null},{"queueId":1111,"map":"Convergence","description":"Teamfight Tactics test ","notes":null},{"queueId":1200,"map":"Nexus Blitz","description":"Nexus Blitz ","notes":"Deprecated in patch 9.2"},{"queueId":1300,"map":"Nexus Blitz","description":"Nexus Blitz ","notes":null},{"queueId":1400,"map":"Summoner\'s Rift","description":"Ultimate Spellbook ","notes":null},{"queueId":1900,"map":"Summoner\'s Rift","description":"Pick URF ","notes":null},{"queueId":2000,"map":"Summoner\'s Rift","description":"Tutorial 1","notes":null},{"queueId":2010,"map":"Summoner\'s Rift","description":"Tutorial 2","notes":null},{"queueId":2020,"map":"Summoner\'s Rift","description":"Tutorial 3","notes":null},{"queueId":1700,"map":"Arena","description":"Arena 8v8","notes":null}]');
;// CONCATENATED MODULE: ./pages/api/summoner/[region]/summonerSpells.json
const summonerSpells_namespaceObject = JSON.parse('{"1":"SummonerBoost","3":"SummonerExhaust","4":"SummonerFlash","6":"SummonerHaste","7":"SummonerHeal","11":"SummonerSmite","12":"SummonerTeleport","14":"SummonerDot","21":"SummonerBarrier"}');
;// CONCATENATED MODULE: external "memory-cache"
const external_memory_cache_namespaceObject = require("memory-cache");
var external_memory_cache_default = /*#__PURE__*/__webpack_require__.n(external_memory_cache_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/summoner/[region]/[username].ts

 // Import the queues.json file
 // Import the queues.json file

const regionCodeMap = {
    br: "BR1",
    eune: "EUN1",
    euw: "EUW1",
    jp: "JP1",
    kr: "KR",
    lan: "LA1",
    las: "LA2",
    na: "NA1",
    oce: "OC1",
    tr: "TR1",
    ru: "RU",
    ph: "PH2",
    sg: "SG2",
    th: "TH2",
    tw: "TW2",
    vn: "VN2"
};
const platformToRegionMap = {
    BR1: "americas",
    EUN1: "europe",
    EUW1: "europe",
    JP1: "asia",
    KR: "asia",
    LA1: "americas",
    LA2: "americas",
    NA1: "americas",
    OC1: "americas",
    TR1: "europe",
    RU: "europe",
    PH2: "asia",
    SG2: "asia",
    TH2: "asia",
    TW2: "asia",
    VN2: "asia"
};
const playerChips = [];
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
const handler = async (_req, res)=>{
    const apiKey = "RGAPI-70e20392-19ee-4299-acf3-23d42e90fac9";
    const region = _req.query.region;
    const summonerName = _req.query.username;
    const modifiedRegion = regionCodeMap[region];
    if (!modifiedRegion) {
        return res.status(400).json({
            message: "Invalid region code."
        });
    }
    const plat = platformToRegionMap[modifiedRegion];
    if (!plat) {
        return res.status(400).json({
            message: "Invalid region code."
        });
    }
    const platform = plat.toUpperCase();
    const cacheKey = `${modifiedRegion}-${summonerName}`;
    console.log("chip");
    try {
        // const summonerName = 'fnug';
        const cachedData = external_memory_cache_default().get(cacheKey);
        if (cachedData) {
            return res.status(200).json(cachedData);
            console.log("Data fetched from cache");
        }
        console.log("hello");
        const summonerResponse = await external_node_fetch_default()(`https://${modifiedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
        if (!summonerResponse.ok) {
            throw new Error("Failed to fetch summoner data");
        }
        const summoner = await summonerResponse.json();
        const summonerData = {
            name: summoner.name,
            level: summoner.summonerLevel,
            accountId: summoner.accountId,
            summonerId: summoner.id,
            puuid: summoner.puuid,
            profileIcon: summoner.profileIconId
        };
        const summonerLeagueV4 = await external_node_fetch_default()(`https://${modifiedRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.summonerId}?api_key=${apiKey}`);
        if (!summonerLeagueV4.ok) {
            throw new Error("Failed to fetch summoner leagueV4");
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
        const soloQueueData = leagueV4.find((queue)=>queue.queueType === "RANKED_SOLO_5x5");
        // Get Flex Queue data (if available)
        const flexQueueData = leagueV4.find((queue)=>queue.queueType === "RANKED_FLEX_SR");
        // Check if Solo Queue data exists and store its properties
        const soloQueueInfo = soloQueueData ? {
            queueType: soloQueueData.queueType,
            tier: soloQueueData.tier,
            rank: soloQueueData.rank,
            leaguePoints: soloQueueData.leaguePoints,
            wins: soloQueueData.wins,
            losses: soloQueueData.losses,
            veteran: soloQueueData.veteran,
            inactive: soloQueueData.inactive,
            freshBlood: soloQueueData.freshBlood,
            hotStreak: soloQueueData.hotStreak
        } : null;
        // Check if Flex Queue data exists and store its properties
        const flexQueueInfo = flexQueueData ? {
            queueType: flexQueueData.queueType,
            tier: flexQueueData.tier,
            rank: flexQueueData.rank,
            leaguePoints: flexQueueData.leaguePoints,
            wins: flexQueueData.wins,
            losses: flexQueueData.losses,
            veteran: flexQueueData.veteran,
            inactive: flexQueueData.inactive,
            freshBlood: flexQueueData.freshBlood,
            hotStreak: flexQueueData.hotStreak
        } : null;
        // Fetch new match history
        const matchesResponse = await external_node_fetch_default()(`https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=${MAX_MATCH_HISTORY_COUNT}&api_key=${apiKey}`);
        if (!matchesResponse.ok) {
            throw new Error("Failed to fetch match data");
        }
        const newMatches = await matchesResponse.json();
        // If cache is empty or doesn't have match history, populate it with fetched match data
        if (!cachedData || !cachedData.matchHistory) {
            const newMatchData = await fetchMatchData(newMatches, apiKey, summonerData.puuid, platform);
            const championStats = calculateChampionStats(newMatchData);
            //       const improvementSuggestionsText = await generateSuggestionsForImprovement(newMatchData);
            // console.log(improvementSuggestionsText);
            external_memory_cache_default().put(cacheKey, {
                summonerData,
                playerChips,
                soloQueueInfo,
                flexQueueInfo,
                championStats,
                matchHistory: newMatchData
            }, CACHE_DURATION);
            return res.status(200).json({
                summonerData,
                playerChips,
                soloQueueInfo,
                flexQueueInfo,
                championStats,
                matchHistory: newMatchData
            });
        }
        // Compare with previously stored match IDs to identify new matches
        const storedMatches = cachedData.matchHistory || [];
        const newMatchesToFetch = newMatches.filter((matchId)=>!storedMatches.includes(matchId));
        // Fetch and update data for new matches
        const newMatchData = await fetchMatchData(newMatchesToFetch, apiKey, summonerData.puuid, platform);
        const updatedMatchHistory = [
            ...newMatchData,
            ...cachedData.matchHistory || []
        ];
        const championStats = calculateChampionStats(updatedMatchHistory);
        // Store the updated data
        external_memory_cache_default().put(cacheKey, {
            summonerData,
            playerChips,
            soloQueueInfo,
            flexQueueInfo,
            championStats,
            matchHistory: updatedMatchHistory
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
        console.error("Error fetching summoner:", error);
        res.status(500).json({
            message: "Failed to fetch summoner data"
        });
    }
};
const retryableFetch = async (url, retries = 0, maxRetries)=>{
    try {
        const response = await external_node_fetch_default()(url);
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
async function fetchMatchData(matches, apiKey, puuid, platform) {
    const currentTime = Date.now();
    playerChips.length = 0;
    const matchOutcomes = [];
    const matchPromises = matches.map(async (matchId)=>{
        try {
            const gameData = await retryableFetch(`https://${platform}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`, 0, 5 // The maximum number of retries you want
            );
            // const gameData = await response.json();
            // Filter out matches with queueId 1700
            if (gameData.info.queueId === 1700) {
                return null; // Skip this match
            }
            const participant = gameData.info.participants.find((p)=>p.puuid === puuid);
            if (!participant) {
                console.log(`Participant for summoner not found in match ${matchId}`);
                return null;
            }
            const { win, kills, deaths, assists, championName, championId, summoner1Id, summoner2Id, item0, item1, item2, item3, item4, item5, perks, totalMinionsKilled, teamEarlySurrendered, teamId, teamPosition } = participant;
            const { gameMode, gameId, gameCreation, gameEndTimestamp, gameDuration, queueId } = gameData.info;
            const queueName = getQueueNameById(gameData.info.queueId, queues_namespaceObject);
            const summoner1Name = getSummonerSpellNameById(summoner1Id, summonerSpells_namespaceObject);
            const summoner2Name = getSummonerSpellNameById(summoner2Id, summonerSpells_namespaceObject);
            const timeSinceMatch = Math.floor((currentTime - gameEndTimestamp) / 1000);
            const timeSinceMatchText = formatTimeSinceMatch(timeSinceMatch);
            const formattedGameDuration = formatGameDuration(gameDuration);
            const csPerMinute = (totalMinionsKilled / (gameDuration / 60)).toFixed(1);
            const kda = ((kills + assists) / deaths).toFixed(2);
            const participantSummonerNames = gameData.info.participants.map((p)=>p.summonerName);
            const participantChampionIds = gameData.info.participants.map((p)=>p.championId);
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
                items: {
                    item0,
                    item1,
                    item2,
                    item3,
                    item4,
                    item5
                },
                perks: perks,
                timeSinceMatch: timeSinceMatchText,
                gameDuration: formattedGameDuration,
                gameEndTimestamp,
                participant
            };
        } catch (error) {
            console.error(`Error fetching match ${matchId}:`, error);
            return null;
        }
    });
    const matchData = await Promise.all(matchPromises);
    // Filter out null and undefined matches
    const filteredMatchData = matchData.filter((match)=>match !== null && match !== undefined);
    // Sort filteredMatchData by gameEndTimestamp
    const sortedMatchData = filteredMatchData.sort((a, b)=>b?.gameEndTimestamp - a?.gameEndTimestamp);
    // Populate matchOutcomes array using sortedMatchData
    sortedMatchData.forEach((match)=>{
        matchOutcomes.push(match?.win ? "Victory" : "Defeat");
    });
    // Reverse matchOutcomes array
    const reversedMatchOutcomes = matchOutcomes.slice().reverse();
    // Calculate current loss streak using reversedMatchOutcomes array
    const currentLossStreak = reversedMatchOutcomes.reduce((streak, outcome)=>outcome === "Defeat" ? streak + 1 : 0, 0);
    if (currentLossStreak >= 3) {
        playerChips.push({
            name: "Cold Streak",
            desc: `${currentLossStreak} Cold Streak`,
            icon: "AcUnit",
            color: "#3174fa"
        });
        console.log("pushed chip");
    }
    const currentWinStreak = reversedMatchOutcomes.reduce((streak, outcome)=>outcome === "Victory" ? streak + 1 : 0, 0);
    if (currentWinStreak >= 3) {
        playerChips.push({
            name: "Hot Streak",
            desc: `${currentWinStreak} Hot Streak`,
            icon: "WhatshotIcon",
            color: "#ff4e50"
        });
        console.log("pushed chip");
    }
    console.log(playerChips);
    return filteredMatchData;
}
async function getMatchData(apiKey, puuid, platform) {
    // Set your API key, puuid, and platform
    // Get the matches
    const matchesResponse = await fetch(`https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=19&api_key=${apiKey}`);
    if (!matchesResponse.ok) {
        throw new Error("Failed to fetch match data");
    }
    const matches = await matchesResponse.json();
    // Fetch the match data using the fetchMatchData function
    const matchData = await fetchMatchData(matches, apiKey, puuid, platform);
    // Filter out any null values
    const filteredMatchData = matchData.filter((match)=>match !== null);
    // Do something with the match data
    console.log(filteredMatchData);
}
function calculateChampionStats(matchData) {
    const championStats = {};
    matchData.forEach((matchEntry)=>{
        championStats[matchEntry.champion_name] = championStats[matchEntry.champion_name] || {
            gamesPlayed: 0,
            wins: 0
        };
        championStats[matchEntry.champion_name].gamesPlayed++;
        if (matchEntry.win) {
            championStats[matchEntry.champion_name].wins++;
        }
    });
    const sortedChampionStats = {};
    Object.entries(championStats).map(([champion_name, stats])=>({
            champion_name,
            ...stats
        })).sort((a, b)=>b.gamesPlayed - a.gamesPlayed) // Sort in descending order of games played
    .forEach((entry)=>{
        sortedChampionStats[entry.champion_name] = {
            gamesPlayed: entry.gamesPlayed,
            wins: entry.wins,
            winRate: entry.wins / entry.gamesPlayed * 100
        };
    });
    return sortedChampionStats;
}
function formatTimeSinceMatch(timeSinceMatch) {
    if (timeSinceMatch < 60) {
        return `${timeSinceMatch} second${timeSinceMatch !== 1 ? "s" : ""} ago`;
    } else if (timeSinceMatch < 60 * 60) {
        const minutes = Math.floor(timeSinceMatch / 60);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeSinceMatch < 24 * 60 * 60) {
        const hours = Math.floor(timeSinceMatch / (60 * 60));
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
        const days = Math.floor(timeSinceMatch / (24 * 60 * 60));
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
}
function formatGameDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
function getQueueNameById(queueId, queueData) {
    const queue = queueData.find((q)=>q.queueId === queueId);
    return queue ? queue.description : "Unknown";
}
function getSummonerSpellNameById(summonerSpellId, summonerSpellData) {
    const summonerSpellName = summonerSpellData[summonerSpellId];
    return summonerSpellName || "Unknown";
}
// Move the summonerLiveResponse fetching inside a separate function
async function fetchSummonerLive(apiKey, summonerId, modifiedRegion) {
    const summonerLiveResponse = await fetch(`https://${modifiedRegion}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${apiKey}`);
    if (summonerLiveResponse.ok) {
        return await summonerLiveResponse.json();
    } else if (summonerLiveResponse.status === 404) {
        console.log("Summoner is not in a game");
        return null;
    } else {
        throw new Error("Failed to fetch summoner live data");
    }
}
// Inside your main handler
// const summonerLive = await fetchSummonerLive(apiKey, summonerData.summonerId, modifiedRegion);
/* harmony default export */ const _username_ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4986));
module.exports = __webpack_exports__;

})();