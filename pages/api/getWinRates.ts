// pages/api/getWinRates.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('riotGames');
    const collection = db.collection('winRates');



    const winRatesData = await collection.find({}).toArray();
    console.log(winRatesData)
    res.status(200).json(winRatesData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await client.close();
  }
}
