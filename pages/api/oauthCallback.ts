import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const accessCode = req.query.code;

    const clientId = process.env.RIOT_CLIENT_ID;
    const clientSecret = process.env.RIOT_CLIENT_SECRET;
    const redirectUri = process.env.RIOT_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    const tokenResponse = await axios.post(
      'https://auth.riotgames.com/token',
      `client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${accessCode}&grant_type=authorization_code`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    console.log(accessToken)
  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
