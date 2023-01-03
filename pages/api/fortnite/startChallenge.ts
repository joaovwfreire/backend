// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../server/mongo/middleware/mongodb";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { getStats } from "../../../utils/requests";


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

        const upsertAction = await db
          .collection("challengeInstances")
          .updateOne(
            { challengeId: 1, gameId: gameId },
            {  // $set: { challengeId: 1, gameId: gameId, status: "started"},
                $setOnInsert: { challengeId: 1, gameId: gameId, start: Math.ceil(Date.now()/1000), status: "started", initialStats: stats }
            },
            { upsert: true }
          );

      res.status(200).json({message: "Challenge succesfully processed", upsertAction});
    } catch (e) {
      res.status(400).json(e);
    }
  }

}
