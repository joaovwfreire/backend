// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../server/mongo/middleware/mongodb";
import { getDota2Matches } from "../../../../utils/requests";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    const gameId = req.body.game_id;
  const challengeId = req.body.challenge_id;

  if (req.method === "POST" && gameId && challengeId) {
    try {
      const stats = await getDota2Matches(gameId);
        
      const client = await clientPromise;
        const db = client.db("gamepayy");

        const getAction = await db
          .collection("challengeInstances")
          .findOne(
            { challengeId: challengeId, gameId: gameId, status: "started" }
          );

        const getAction2 = await db
          .collection("challengeInstances")
          .findOne(
            { challengeId: challengeId, gameId: gameId, status: "started-non-repeatable" }
          );
        const getAction3 = await db
          .collection("challengeInstances")
          .findOne(
            { challengeId: challengeId, gameId: gameId, status: "finished-non-repeatable" }
          );

       const initial_response = getAction?.initialStats.overall; 
       const initial_response2 = getAction2?.initialStats.overall;
       const initital_response3 = getAction3?.initialStats.overall;
       const initialTimestamp = getAction?.start;

       if (initial_response != null || initial_response2 != null || initital_response3 != null){
        res.status(400).json({message: "Active challenge in progress."});
       }

        const upsertAction = await db
          .collection("challengeInstances")
          .updateOne(
            { challengeId: challengeId, gameId: gameId, status: "started" },
            {  // $set: { challengeId: 1, gameId: gameId, status: "started"},
                $setOnInsert: { challengeId: challengeId, gameId: gameId, start: Math.ceil(Date.now()/1000), status: "started", initialStats: stats }
            },
            { upsert: true }
          );

      res.status(200).json({message: "Challenge succesfully processed", upsertAction});
    } catch (e) {
      res.status(400).json(e);
    }
  }

}
