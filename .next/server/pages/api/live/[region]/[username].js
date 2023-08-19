"use strict";
(() => {
var exports = {};
exports.id = 363;
exports.ids = [363];
exports.modules = {

/***/ 4809:
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ 3501:
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
;// CONCATENATED MODULE: ./pages/api/live/[region]/queues.json
const queues_namespaceObject = JSON.parse('[{"queueId":0,"map":"Custom Game","description":null,"notes":null},{"queueId":2,"map":"Summoner\'s Rift","description":"Blind Pick ","notes":"Deprecated in patch 7.19 in favor of queueId 430"},{"queueId":4,"map":"Summoner\'s Rift","description":"Ranked Solo ","notes":"Deprecated in favor of queueId 420"},{"queueId":6,"map":"Summoner\'s Rift","description":"Ranked Premade ","notes":"Game mode deprecated"},{"queueId":7,"map":"Summoner\'s Rift","description":"Co-op vs AI ","notes":"Deprecated in favor of queueId 32 and 33"},{"queueId":8,"map":"Twisted Treeline","description":"3v3 Normal ","notes":"Deprecated in patch 7.19 in favor of queueId 460"},{"queueId":9,"map":"Twisted Treeline","description":"3v3 Ranked Flex ","notes":"Deprecated in patch 7.19 in favor of queueId 470"},{"queueId":14,"map":"Summoner\'s Rift","description":"Draft Pick ","notes":"Deprecated in favor of queueId 400"},{"queueId":16,"map":"Crystal Scar","description":"Dominion Blind Pick ","notes":"Game mode deprecated"},{"queueId":17,"map":"Crystal Scar","description":"Dominion Draft Pick ","notes":"Game mode deprecated"},{"queueId":25,"map":"Crystal Scar","description":"Dominion Co-op vs AI ","notes":"Game mode deprecated"},{"queueId":31,"map":"Summoner\'s Rift","description":"Co-op vs AI Intro Bot ","notes":"Deprecated in patch 7.19 in favor of queueId 830"},{"queueId":32,"map":"Summoner\'s Rift","description":"Co-op vs AI Beginner Bot ","notes":"Deprecated in patch 7.19 in favor of queueId 840"},{"queueId":33,"map":"Summoner\'s Rift","description":"Co-op vs AI Intermediate Bot ","notes":"Deprecated in patch 7.19 in favor of queueId 850"},{"queueId":41,"map":"Twisted Treeline","description":"3v3 Ranked Team ","notes":"Game mode deprecated"},{"queueId":42,"map":"Summoner\'s Rift","description":"Ranked Team ","notes":"Game mode deprecated"},{"queueId":52,"map":"Twisted Treeline","description":"Co-op vs AI ","notes":"Deprecated in patch 7.19 in favor of queueId 800"},{"queueId":61,"map":"Summoner\'s Rift","description":"Team Builder ","notes":"Game mode deprecated"},{"queueId":65,"map":"Howling Abyss","description":"ARAM ","notes":"Deprecated in patch 7.19 in favor of queueId 450"},{"queueId":67,"map":"Howling Abyss","description":"ARAM Co-op vs AI ","notes":"Game mode deprecated"},{"queueId":70,"map":"Summoner\'s Rift","description":"One for All ","notes":"Deprecated in patch 8.6 in favor of queueId 1020"},{"queueId":72,"map":"Howling Abyss","description":"1v1 Snowdown Showdown ","notes":null},{"queueId":73,"map":"Howling Abyss","description":"2v2 Snowdown Showdown ","notes":null},{"queueId":75,"map":"Summoner\'s Rift","description":"6v6 Hexakill ","notes":null},{"queueId":76,"map":"Summoner\'s Rift","description":"Ultra Rapid Fire ","notes":null},{"queueId":78,"map":"Howling Abyss","description":"One For All: Mirror Mode ","notes":null},{"queueId":83,"map":"Summoner\'s Rift","description":"Co-op vs AI Ultra Rapid Fire ","notes":null},{"queueId":91,"map":"Summoner\'s Rift","description":"Doom Bots Rank 1 ","notes":"Deprecated in patch 7.19 in favor of queueId 950"},{"queueId":92,"map":"Summoner\'s Rift","description":"Doom Bots Rank 2 ","notes":"Deprecated in patch 7.19 in favor of queueId 950"},{"queueId":93,"map":"Summoner\'s Rift","description":"Doom Bots Rank 5 ","notes":"Deprecated in patch 7.19 in favor of queueId 950"},{"queueId":96,"map":"Crystal Scar","description":"Ascension ","notes":"Deprecated in patch 7.19 in favor of queueId 910"},{"queueId":98,"map":"Twisted Treeline","description":"6v6 Hexakill ","notes":null},{"queueId":100,"map":"Butcher\'s Bridge","description":"ARAM ","notes":null},{"queueId":300,"map":"Howling Abyss","description":"Legend of the Poro King ","notes":"Deprecated in patch 7.19 in favor of queueId 920"},{"queueId":310,"map":"Summoner\'s Rift","description":"Nemesis ","notes":null},{"queueId":313,"map":"Summoner\'s Rift","description":"Black Market Brawlers ","notes":null},{"queueId":315,"map":"Summoner\'s Rift","description":"Nexus Siege ","notes":"Deprecated in patch 7.19 in favor of queueId 940"},{"queueId":317,"map":"Crystal Scar","description":"Definitely Not Dominion ","notes":null},{"queueId":318,"map":"Summoner\'s Rift","description":"ARURF ","notes":"Deprecated in patch 7.19 in favor of queueId 900"},{"queueId":325,"map":"Summoner\'s Rift","description":"All Random ","notes":null},{"queueId":400,"map":"Summoner\'s Rift","description":"Draft Pick ","notes":null},{"queueId":410,"map":"Summoner\'s Rift","description":"Ranked Dynamic ","notes":"Game mode deprecated in patch 6.22"},{"queueId":420,"map":"Summoner\'s Rift","description":"Ranked Solo ","notes":null},{"queueId":430,"map":"Summoner\'s Rift","description":"Blind Pick ","notes":null},{"queueId":440,"map":"Summoner\'s Rift","description":"Ranked Flex ","notes":null},{"queueId":450,"map":"Howling Abyss","description":"ARAM ","notes":null},{"queueId":460,"map":"Twisted Treeline","description":"3v3 Blind Pick ","notes":"Deprecated in patch 9.23"},{"queueId":470,"map":"Twisted Treeline","description":"3v3 Ranked Flex ","notes":"Deprecated in patch 9.23"},{"queueId":600,"map":"Summoner\'s Rift","description":"Blood Hunt Assassin ","notes":null},{"queueId":610,"map":"Cosmic Ruins","description":"Dark Star: Singularity ","notes":null},{"queueId":700,"map":"Summoner\'s Rift","description":"Summoner\'s Rift Clash ","notes":null},{"queueId":720,"map":"Howling Abyss","description":"ARAM Clash ","notes":null},{"queueId":800,"map":"Twisted Treeline","description":"Co-op vs. AI Intermediate Bot ","notes":"Deprecated in patch 9.23"},{"queueId":810,"map":"Twisted Treeline","description":"Co-op vs. AI Intro Bot ","notes":"Deprecated in patch 9.23"},{"queueId":820,"map":"Twisted Treeline","description":"Co-op vs. AI Beginner Bot ","notes":null},{"queueId":830,"map":"Summoner\'s Rift","description":"Co-op vs. AI Intro Bot ","notes":null},{"queueId":840,"map":"Summoner\'s Rift","description":"Co-op vs. AI Beginner Bot ","notes":null},{"queueId":850,"map":"Summoner\'s Rift","description":"Co-op vs. AI Intermediate Bot ","notes":null},{"queueId":900,"map":"Summoner\'s Rift","description":"ARURF ","notes":null},{"queueId":910,"map":"Crystal Scar","description":"Ascension ","notes":null},{"queueId":920,"map":"Howling Abyss","description":"Legend of the Poro King ","notes":null},{"queueId":940,"map":"Summoner\'s Rift","description":"Nexus Siege ","notes":null},{"queueId":950,"map":"Summoner\'s Rift","description":"Doom Bots Voting ","notes":null},{"queueId":960,"map":"Summoner\'s Rift","description":"Doom Bots Standard ","notes":null},{"queueId":980,"map":"Valoran City Park","description":"Star Guardian Invasion: Normal ","notes":null},{"queueId":990,"map":"Valoran City Park","description":"Star Guardian Invasion: Onslaught ","notes":null},{"queueId":1000,"map":"Overcharge","description":"PROJECT: Hunters ","notes":null},{"queueId":1010,"map":"Summoner\'s Rift","description":"Snow ARURF ","notes":null},{"queueId":1020,"map":"Summoner\'s Rift","description":"One for All ","notes":null},{"queueId":1030,"map":"Crash Site","description":"Odyssey Extraction: Intro ","notes":null},{"queueId":1040,"map":"Crash Site","description":"Odyssey Extraction: Cadet ","notes":null},{"queueId":1050,"map":"Crash Site","description":"Odyssey Extraction: Crewmember ","notes":null},{"queueId":1060,"map":"Crash Site","description":"Odyssey Extraction: Captain ","notes":null},{"queueId":1070,"map":"Crash Site","description":"Odyssey Extraction: Onslaught ","notes":null},{"queueId":1090,"map":"Convergence","description":"Teamfight Tactics ","notes":null},{"queueId":1100,"map":"Convergence","description":"Ranked Teamfight Tactics ","notes":null},{"queueId":1110,"map":"Convergence","description":"Teamfight Tactics Tutorial ","notes":null},{"queueId":1111,"map":"Convergence","description":"Teamfight Tactics test ","notes":null},{"queueId":1200,"map":"Nexus Blitz","description":"Nexus Blitz ","notes":"Deprecated in patch 9.2"},{"queueId":1300,"map":"Nexus Blitz","description":"Nexus Blitz ","notes":null},{"queueId":1400,"map":"Summoner\'s Rift","description":"Ultimate Spellbook ","notes":null},{"queueId":1900,"map":"Summoner\'s Rift","description":"Pick URF ","notes":null},{"queueId":2000,"map":"Summoner\'s Rift","description":"Tutorial 1","notes":null},{"queueId":2010,"map":"Summoner\'s Rift","description":"Tutorial 2","notes":null},{"queueId":2020,"map":"Summoner\'s Rift","description":"Tutorial 3","notes":null},{"queueId":1700,"map":"Arena","description":"Arena 8v8","notes":null}]');
;// CONCATENATED MODULE: ./pages/api/live/[region]/summonerSpells.json
const summonerSpells_namespaceObject = JSON.parse('{"1":"SummonerBoost","3":"SummonerExhaust","4":"SummonerFlash","6":"SummonerHaste","7":"SummonerHeal","11":"SummonerSmite","12":"SummonerTeleport","14":"SummonerDot","21":"SummonerBarrier"}');
;// CONCATENATED MODULE: ./pages/api/live/[region]/[username].ts

 // Import the queues.json file
 // Import the queues.json file
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
const handler = async (_req, res)=>{
    const apiKey = "RGAPI-815d07e4-4824-4c41-9c6d-61e15eb6ebf0";
    const region = _req.query.region.toUpperCase();
    const summonerName = _req.query.username;
    const platform = platformToRegionMap[region];
    try {
        // const summonerName = 'fnug';
        const summonerResponse = await external_node_fetch_default()(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`);
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
        const summonerLeagueV4 = await external_node_fetch_default()(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.summonerId}?api_key=${apiKey}`);
        if (!summonerLeagueV4.ok) {
            throw new Error("not in game ");
        }
        const summonerLiveResponse = await external_node_fetch_default()(`https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerData.summonerId}?api_key=${apiKey}`);
        if (!summonerLiveResponse.ok) {
            throw new Error("Failed to fetch summoner leagueV4");
        }
        const summonerLive = await summonerLiveResponse.json();
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
        const matchesResponse = await external_node_fetch_default()(`https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerData.puuid}/ids?start=0&count=20&api_key=${apiKey}`);
        if (!matchesResponse.ok) {
            throw new Error("Failed to fetch match data");
        }
        const matches = await matchesResponse.json();
        const matchData = await fetchMatchData(matches, apiKey, summonerData.puuid, platform);
        const filteredMatchData = matchData.filter((match)=>match !== null);
        // const championStats: ChampionStats = calculateChampionStats(filteredMatchData, summonerData.summonerId);
        res.status(200).json({
            summonerData,
            summonerLive
        });
    } catch (error) {
        console.error("Error fetching summoner:", error);
        res.status(500).json({
            message: "Failed to fetch summoner data"
        });
    }
};
async function fetchMatchData(matches, apiKey, puuid, platform) {
    const currentTime = Date.now();
    const matchPromises = matches.map(async (matchId)=>{
        try {
            const response = await external_node_fetch_default()(`https://${platform}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch match ${matchId}`);
            }
            const gameData = await response.json();
            const participant = gameData.info.participants.find((p)=>p.puuid === puuid);
            if (!participant) {
                console.log(`Participant for summoner not found in match ${matchId}`);
                return null;
            }
            const { win, kills, deaths, assists, championName, championId, summoner1Id, summoner2Id, item0, item1, item2, item3, item4, item5 } = participant;
            const { gameMode, gameId, gameCreation, gameEndTimestamp, gameDuration } = gameData.info;
            const queueName = getQueueNameById(gameData.info.queueId, queues_namespaceObject);
            const summoner1Name = getSummonerSpellNameById(summoner1Id, summonerSpells_namespaceObject);
            const summoner2Name = getSummonerSpellNameById(summoner2Id, summonerSpells_namespaceObject);
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
                items: {
                    item0,
                    item1,
                    item2,
                    item3,
                    item4,
                    item5
                },
                timeSinceMatch: timeSinceMatchText,
                gameDuration: formattedGameDuration
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
/* harmony default export */ const _username_ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3501));
module.exports = __webpack_exports__;

})();