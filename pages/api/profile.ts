import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate, createHttpSession, createHttp2Request, Http2Response } from 'league-connect';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const credentials = await authenticate();
    const session = await createHttpSession(credentials);

    const summonerResponse: Http2Response = await createHttp2Request(
      {
        method: 'GET',
        url: '/lol-summoner/v1/current-summoner',
      },
      session,
      credentials
    );

  
      

    
    const summonerName = summonerResponse.json();

    res.status(200).json({ summonerName });
  } catch (error) {
    console.error('Error retrieving summoner name:', error);
    res.status(500).json({ error: 'An error occurred while retrieving summoner name.' });
  }
};

export default handler;
