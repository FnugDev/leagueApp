import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import ChampionStyles from '../../styles/Champions.module.css';

interface Champion {
  id: string;
  name: string;
  image: any;
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
      <Grid container>
        {champions.map((champion) => (
          <Grid item key={champion.id}>
            <div className={ChampionStyles.championContainer}>
            <img
            className={ChampionStyles.championImg}
            //   src={`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.id}.png`}
            // src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/${champion.name.toLowerCase()}/skins/base/${champion.name.toLowerCase()}loadscreen.jpg`}
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
              alt={champion.name}
              style={{ width: '50%', height: 'auto' }}
            />
</div>



          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
