// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prevUrl = req.query.prevUrl as string;
  const clientId = "28e556f6-deb6-41c4-9f92-b6c9e3554aba"
  const redirectUri = prevUrl;
//   const redirectUri = "https://viola-beta.vercel.app/";
//   const clientId = process.env.RIOT_CLIENT_ID;
//   const redirectUri = process.env.RIOT_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    res.status(500).send("Environment variables are not set.");
    return;
  }

  res.redirect(
    `https://auth.riotgames.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid+offline_access`
  );
};

export default handler;