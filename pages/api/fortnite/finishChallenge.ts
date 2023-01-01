// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../server/mongo/middleware/mongodb";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { getStats } from "../../../utils/requests";
import { checkChallenge } from "../../../utils/challengeSolver";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const gameId = req.body.game_id;
  const challengeId = req.body.challenge_id;

  if (req.method === "POST" && gameId && challengeId) {
    try {
      const stats = await getStats(gameId);
        
      const client = await clientPromise;
        const db = client.db("gamepayy");

        const getAction = await db
          .collection("challengeInstances")
          .findOne(
            { challengeId: 1, gameId: gameId }
          );

       const initial_response = getAction?.initialStats.overall;
       const currentStats = stats.overall;

       const getChallenge = await db
          .collection("challenges")
          .findOne(
            { id: 1 }
          );
        const requirements = getChallenge?.statusChange;

        const response = await checkChallenge(initial_response, currentStats, requirements);
        if (response){
          res.status(200).json("Challenge solved");   
        }else {
          
          res.status(200).json("Challenge not solved");
        }   
    } catch (e) {
      res.status(400).json(e);
    }
  }

}
