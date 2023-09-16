// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  // Unset the accessToken cookie
  res.setHeader('Set-Cookie', 'accessToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  
  res.status(200).send("Logged out");
};

export default logout;
