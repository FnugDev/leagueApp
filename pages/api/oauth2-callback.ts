import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const clientId = process.env.RIOT_CLIENT_ID;
const redirectUri = process.env.RIOT_REDIRECT_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!clientId || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    // Load the private key from the same directory as this file
    const privateKey = fs.readFileSync(path.resolve(__dirname, 'private.pem'), 'utf8');

    const uniqueId = uuidv4();
    const payload = {
      iss: clientId,
      sub: clientId,
      aud: 'https://auth.riotgames.com/token',
      jti: uniqueId,
      exp: Math.floor(Date.now() / 1000) + 6000,
    };

    // Sign the JWT with the private key
    const signedJwt = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    const code = req.query.code as string;
    const tokenData = {
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: signedJwt,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    };

    const tokenResponse = await axios.post('https://auth.riotgames.com/token', tokenData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.status(200).json(tokenResponse.data);

  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
