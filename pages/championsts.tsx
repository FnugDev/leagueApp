import React, { useEffect, useState } from 'react';

interface ChampionData {
  wins: number;
  totalGames: number;
  championName: string;
}
let championByIdCache = {};
let championJson = {};

async function getLatestChampionDDragon(language = "en_US") {

	if (championJson[language])
		return championJson[language];

	let response;
	let versionIndex = 0;
	do { // I loop over versions because 9.22.1 is broken
		const version = (await fetch("http://ddragon.leagueoflegends.com/api/versions.json").then(async(r) => await r.json()))[versionIndex++];
	
		response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
	}
	while (!response.ok)
	
	championJson[language] = await response.json();
	return championJson[language];
}

async function getChampionByKey(key, language = "en_US") {

	// Setup cache
	if (!championByIdCache[language]) {
		let json = await getLatestChampionDDragon(language);

		championByIdCache[language] = {};
		for (var championName in json.data) {
			if (!json.data.hasOwnProperty(championName))
				continue;

			const champInfo = json.data[championName];
			championByIdCache[language][champInfo.key] = champInfo;
		}
	}

	return championByIdCache[language][key];
}

// NOTE: IN DDRAGON THE ID IS THE CLEAN NAME!!! It's also super-inconsistent, and broken at times.
// Cho'gath => Chogath, Wukong => Monkeyking, Fiddlesticks => Fiddlesticks/FiddleSticks (depending on what mood DDragon is in this patch)
async function getChampionByID(name, language = "en_US") {
	return await getLatestChampionDDragon(language)[name];
}




const WinRates = () => {
  const [filteredData, setFilteredData] = useState<ChampionData[]>([]);
  const [winRatesData, setWinRatesData] = useState<any>({});

  useEffect(() => {
    const fetchWinRates = async () => {
      try {
        const res = await fetch('/api/getWinRates');
        const data = await res.json();
        // Assuming data is an array and we want the first item
        const firstData = data[0];
        setWinRatesData(firstData);
      } catch (error) {
        console.error("An error occurred while fetching win rates", error);
      }
    };

    fetchWinRates();
  }, []);

  const selectedRegion = 'jp1';
  const selectedTier = 'DIAMOND';
  const selectedDivision = 'I';
  const selectedChampionId = '1'; // Replace with the selected champion ID

  useEffect(() => {
    // Check if the data is available for the selected criteria
    const getChampData = async () => {  
        return await getChampionByKey(selectedChampionId, "en_US");
    };

    console.log(getChampData)

    const championData = winRatesData?.[selectedRegion]?.[selectedTier]?.[selectedDivision]?.[selectedChampionId];

    if (championData) {
      // Process the champion data here if needed
      setFilteredData([championData]);
    } else {
      setFilteredData([]);
    }
  }, [winRatesData, selectedRegion, selectedTier, selectedDivision, selectedChampionId]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Champion ID</th>
            <th>Wins</th>
            <th>Total Games</th>
            <th>Champion Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((champion, index) => (
            <tr key={index}>
              <td>{selectedChampionId}</td>
              <td>{champion.wins}</td>
              <td>{champion.totalGames}</td>
              <td>{champion.championName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WinRates;
