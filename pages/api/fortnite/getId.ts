import { User } from "../../../server/mongo/models.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { getId } from "../../../utils/requests";
require("dotenv").config();



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
    const session = await unstable_getServerSession(req, res, authOptions)
   
    if (!session) {
      
      res.status(400).json({Error: "No session"});
      
    } else{
  const userEmail = req.body.email;

  if (req.method === "POST" && userEmail) {
    try {
      const stats = await getId(userEmail);

      res.status(200).json(stats);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
}
