import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const code = req.query.code as string;

    // Read client ID and secret from environment variables
    const clientId = process.env.RIOT_CLIENT_ID;
    const clientSecret = process.env.RIOT_CLIENT_SECRET;
    const redirectUri = process.env.RIOT_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    // Exchange the code for an access token
    const tokenResponse = await axios.post(
      'https://auth.riotgames.com/token',
      `client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}&grant_type=authorization_code`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Set the access token in a HttpOnly cookie
    res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/;`);

    // Fetch the cpid
    const cpidResponse = await axios.get('https://auth.riotgames.com/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const cpid = cpidResponse.data.cpid;

    // Fetch the LoL account information
    const accountResponse = await axios.get(`https://${cpid}.api.riotgames.com/lol/summoner/v4/summoners/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.json({ cpid, account: accountResponse.data });
  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
