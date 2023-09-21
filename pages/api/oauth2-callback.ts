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
      auth: { // sets "Authorization: Basic ..." header
          user: clientId,
          pass: clientSecret
       },
       form: { // post information as x-www-form-urlencoded
           grant_type: "authorization_code",
           code: accessCode, // accessCode should be url decoded before being set here
           redirect_uri: redirectUri
       }
    }, function (error, response, body) {
       // do something with the response?
    });



    // const data = `grant_type=authorization_code&code=${encodeURIComponent(accessCode)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    // const response = await axios.post(tokenUrl, data, { ...auth, headers });

  } catch (error) {
    console.error('Error: ', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

export default handler;
