import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string;
  
  // Exchange the code for an access token
  const tokenResponse = await axios.post('https://auth.riotgames.com/token', {
    client_id: '28e556f6-deb6-41c4-9f92-b6c9e3554aba',
    client_secret: 'Txvwssci7xQmVLcLWJD0n3xk_cXukKrUPWSYSQ9He-0',
    redirect_uri: "https://viola-beta.vercel.app/",
    code,
    grant_type: 'authorization_code'
  });

  const accessToken = tokenResponse.data.access_token;

  // Set the access token in a HttpOnly cookie
  res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/;`);


  // Fetch the cpid
  const cpidResponse = await axios.get('https://auth.riotgames.com/userinfo', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  const cpid = cpidResponse.data.cpid;

  // Fetch the LoL account information using the cpid to choose the appropriate DNS
  const accountResponse = await axios.get(`https://${cpid}.api.riotgames.com/lol/summoner/v4/summoners/me`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  res.json({ cpid, account: accountResponse.data });
};

export default handler;