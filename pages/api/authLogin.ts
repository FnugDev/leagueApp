import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientId = process.env.RIOT_CLIENT_ID;
  const redirectUri = process.env.RIOT_REDIRECT_URI_CALLBACK;

  if (!clientId || !redirectUri) {
    res.status(500).send("Environment variables are not set.");
    return;
  }

  try {
    res.redirect(
      `https://auth.riotgames.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid+offline_access+cpid`
    );
  } catch (error) {
    console.error("Error redirecting: ", error);
    res.status(500).send("An error occurred while redirecting.");
  }
};

export default handler;
