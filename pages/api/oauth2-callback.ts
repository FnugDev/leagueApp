import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const clientId = process.env.RIOT_CLIENT_ID;
const clientSecret = process.env.RIOT_CLIENT_SECRET;
const redirectUri = process.env.RIOT_REDIRECT_URI_CALLBACK;
const tokenUrl = "https://auth.riotgames.com/token"; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    const accessCode = req.query.code as string;
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('code', accessCode);
    data.append('redirect_uri', redirectUri);
    

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
      const { access_token, refresh_token, id_token } = responseData;

      console.log("setting cookie")
      // Store tokens securely, for this example, setting them in cookies
      res.setHeader('Set-Cookie', [
        `accessToken=${access_token}; Path=/; HttpOnly`,
        `refreshToken=${refresh_token}; Path=/; HttpOnly; Secure`,
        `idToken=${id_token}; Path=/; HttpOnly; Secure`,
      ]);

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
