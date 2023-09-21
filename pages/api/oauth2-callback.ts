import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
const request = require('request');



const clientId = process.env.RIOT_CLIENT_ID;
const clientSecret = process.env.RIOT_CLIENT_SECRET;
const redirectUri = process.env.RIOT_REDIRECT_URI;
const tokenUrl = "https://auth.riotgames.com/token"; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!clientId || !clientSecret || !redirectUri) {
      return res.status(500).send('Environment variables are not set.');
    }

    const accessCode = req.query.code;

    // const headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // };

    // const auth = {
    //   auth: {
    //     username: clientId,
    //     password: clientSecret,
    //   },
    // };

    request.post({
      url: tokenUrl,
      auth: {
        user: clientId,
        pass: clientSecret,
      },
      form: {
        grant_type: "authorization_code",
        code: accessCode,
        redirect_uri: redirectUri,
      },
    }, function (error, response, body) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
      }
      
      // If there's no error, handle the body.
      const parsedBody = JSON.parse(body);
      if (parsedBody.error) {
        return res.status(400).json({ error: parsedBody.error });
      }
      
      res.json({ success: true, data: parsedBody });
    });



    // const data = `grant_type=authorization_code&code=${encodeURIComponent(accessCode)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    // const response = await axios.post(tokenUrl, data, { ...auth, headers });

  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
