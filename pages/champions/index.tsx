import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';

interface Champion {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json")
      .then((response) => response.json())
      .then((data) => {
        const fetchedChampions = Object.values(data.data) as Champion[];
        setChampions(fetchedChampions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching champion data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {champions.map((champion) => (
          <Grid item key={champion.id}>
            <img
            //   src={`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.id}.png`}
            src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${champion.name.toLowerCase()}/skins/base/${champion.name.toLowerCase()}loadscreen.jpg`}
              alt={champion.name}
              style={{ width: '50%', height: 'auto' }}
            />
            <p>{champion.name}</p>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
