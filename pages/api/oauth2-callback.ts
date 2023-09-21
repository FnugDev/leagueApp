import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const clientId = process.env.RIOT_CLIENT_ID;
const clientSecret = process.env.RIOT_CLIENT_SECRET;
const redirectUri = process.env.RIOT_REDIRECT_URI_CALLBACK;
const tokenUrl = "https://auth.riotgames.com/token"; 

// Import other required modules
// ...

let refreshToken: string;  // Store this securely

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    const accessCode = req.query.code as string;
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const data = new URLSearchParams();
    if (accessCode) {
      // For initial authentication
      data.append('grant_type', 'authorization_code');
      data.append('code', accessCode);
      data.append('redirect_uri', redirectUri);
    } else if (refreshToken) {
      // For token refresh
      data.append('grant_type', 'refresh_token');
      data.append('refresh_token', refreshToken);
    } else {
      return res.status(400).send('No code or refresh token provided.');
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`
      },
      body: data
    };

    const fetchResponse = await fetch(tokenUrl, fetchOptions);
    const responseData = await fetchResponse.json();

    if (fetchResponse.ok) {
      if (responseData.refresh_token) {
        refreshToken = responseData.refresh_token;  // Store this securely
      }
      res.json({ success: true, data: responseData });
    } else {
      res.status(fetchResponse.status).json({ success: false, error: responseData });
    }
  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
