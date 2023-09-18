import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring'; 
import jwt from 'jsonwebtoken';

const createSignedJwt = () => {
    const payload = {
      iss: 'YourApp',  // Issuer
      sub: 'subject',  // Subject
      aud: 'user',     // Audience
      exp: Math.floor(Date.now() / 1000) + (60 * 60)  // Expires in 1 hour
    };
  
    const secret = process.env.JWT_SECRET;  // Should be in your environment variables
    
    if (!secret) {
      throw new Error("JWT_SECRET is not set in the environment variables.");
    }
  
    const token = jwt.sign(payload, secret, {
      algorithm: 'HS256'
    });
  
    return token;
  };
  

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const accessCode = req.query.code as string;
    // const decodedAccessCode = decodeURIComponent(accessCode); // URL Decoding

    // // Read client ID and secret from environment variables
    // const clientId = process.env.RIOT_CLIENT_ID;
    // const clientSecret = process.env.RIOT_CLIENT_SECRET;
    // const redirectUri = process.env.RIOT_REDIRECT_URI;
    const code = req.query.code as string;
    const clientId = process.env.RIOT_CLIENT_ID;
    const clientSecret = process.env.RIOT_CLIENT_SECRET;
    const redirectUri = process.env.RIOT_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }
    const clientAssertion = createSignedJwt();

    const tokenData = querystring.stringify({
      client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: clientAssertion,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri
    });

    const tokenResponse = await axios.post('https://auth.riotgames.com/token', tokenData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // const tokenResponse = await axios.post(
    //     'https://auth.riotgames.com/token', 
    //     tokenData, 
    //     { 
    //       headers: { 
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       }
    //     }
    //   );

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
