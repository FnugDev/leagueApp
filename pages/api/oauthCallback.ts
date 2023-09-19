import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import { Buffer } from 'buffer';

// Environment Variables
const clientId = process.env.RIOT_CLIENT_ID;
const clientSecret = process.env.RIOT_CLIENT_SECRET;
const redirectUri = process.env.RIOT_REDIRECT_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    // Generate the base64 encoded Authorization header
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const code = req.query.code as string;
    const tokenData = querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });

    console.log('Token Data:', tokenData);

    // Make the POST request to get the access token
    const tokenResponse = await axios.post('https://auth.riotgames.com/token', tokenData, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // The rest of your code...

  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
