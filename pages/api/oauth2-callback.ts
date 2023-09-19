import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import request from 'request';

const clientId = process.env.RIOT_CLIENT_ID;
const clientSecret = process.env.RIOT_CLIENT_SECRET;
const redirectUri = process.env.RIOT_REDIRECT_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    const uniqueId = uuidv4();
    const payload = {
      iss: clientId,
      sub: clientId,
      aud: 'https://auth.riotgames.com/token',
      jti: uniqueId,
      exp: Math.floor(Date.now() / 1000) + 6000,
    };

    const signedJwt = jwt.sign(payload, clientSecret, { algorithm: 'HS256' });
    
    const code = req.query.code as string;
    const tokenData = {
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: signedJwt,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    };
    
    request.post({
      url: 'https://auth.riotgames.com/token',
      form: tokenData
    }, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error });
      } else {
        const parsedBody = JSON.parse(body);
        const accessToken = parsedBody.access_token;
        // The rest of your code...
      }
    });
  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
