import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const cpidResponse = await axios.get('https://auth.riotgames.com/userinfo', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
  
    console.log(cpidResponse.data)

    const cpid = cpidResponse.data.cpid;
  
    const accountResponse = await axios.get(`https://europe.api.riotgames.com/lol/summoner/v4/summoners/me`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    return res.json({ cpid, account: accountResponse.data });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch account info' });
  }
};

export default handler;
