import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const clientId = process.env.RIOT_CLIENT_ID || 'client_id';
const clientSecret = process.env.RIOT_CLIENT_SECRET || 'client_secret';
const redirectUri = process.env.RIOT_REDIRECT_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string;

  try {
    const response = await axios.post(
      'https://auth.riotgames.com/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    const tokens = {
      refresh_token: response.data.refresh_token,
      id_token: response.data.id_token,
      access_token: response.data.access_token,
    };

    res.json(tokens);
  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
