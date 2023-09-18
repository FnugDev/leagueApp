// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface QueryParams {
  prevUrl?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prevUrl }: QueryParams = req.query;
  
  // Use environment variables
  const clientId = process.env.RIOT_CLIENT_ID || "28e556f6-deb6-41c4-9f92-b6c9e3554aba";
  const redirectUri = process.env.RIOT_REDIRECT_URI || "https://viola-beta.vercel.app/api/oauthCallback";

  // Check for missing environment variables
  if (!clientId || !redirectUri) {
    res.status(500).send("Environment variables are not set.");
    return;
  }

  // Optional: You can use the prevUrl for some purpose if needed
  if (prevUrl) {
    // Do something with prevUrl if needed
  }

  try {
    res.redirect(
      `https://auth.riotgames.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid+offline_access`
    );
  } catch (error) {
    console.error("Error redirecting: ", error);
    res.status(500).send("An error occurred while redirecting.");
  }
};

export default handler;
