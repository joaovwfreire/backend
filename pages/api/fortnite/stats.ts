// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { getStats } from "../../../utils/requests";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    
    res.status(400).json({Error: "No session"});
    
  } else{
  const userId = req.body.id;

  if (req.method === "POST" && userId) {
    try {
      const stats = await getStats(userId);

      res.status(200).json(stats);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
}
