import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const clientId = process.env.RIOT_CLIENT_ID;
const clientSecret = process.env.RIOT_CLIENT_SECRET;
const redirectUri = process.env.RIOT_REDIRECT_URI;
const tokenUrl = "https://auth.riotgames.com/token"; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    const accessCode = req.query.code as string;

    const auth = {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };

    const data = {
      grant_type: "authorization_code",
      code: accessCode,
      redirect_uri: redirectUri,
    };

    
    const response = await axios.post(tokenUrl, data, auth);
    
  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
