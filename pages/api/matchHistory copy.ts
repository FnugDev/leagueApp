import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate, createHttpSession, createHttp2Request, Http2Response, createHttp1Request, HttpResponse } from 'league-connect';

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

    const summonerData = summonerResponse.json();
    const accountpuuid = summonerData.puuid;

    const matchHistoryResponse: HttpResponse = await createHttp1Request(
      {
        method: 'GET',

        url: `/lol/match/v5/matches/by-puuid/${accountpuuid}/ids/`,
      },
      credentials
    );

    const responseBody =  matchHistoryResponse.json()
    const matchHistory = JSON.parse(responseBody).matches;

    res.status(200).json({ responseBody });
  } catch (error) {
    console.error('Error retrieving match history:', error);
    res.status(500).json({ error: 'An error occurred while retrieving match history.' });
  }
};

export default handler;
