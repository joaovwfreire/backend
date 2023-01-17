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

  // game id is the user id and not the game's id. This is a mistake in the documentation.
  // I'll fix this ambiguity later.
  
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
            { challengeId: challengeId, gameId: gameId, status: "started-non-repeatable" }
          );

       const initial_response = getAction?.initialStats.overall; 
       const initialTimestamp = getAction?.start;

       if (initial_response == null){
        res.status(400).json({message: "Active challenge not found for this user."});
       }


       const currentStats = stats.overall;

       const getChallenge = await db
          .collection("challenges")
          .findOne(
            { id: challengeId }
          );
        const requirements = getChallenge?.statusChange;
        const timeRequirements = getChallenge?.maxSeconds;

        const finishTimestamp = Math.ceil(Date.now()/1000);

        if(timeRequirements + initialTimestamp < finishTimestamp){
          const upsertAction = await db
          .collection("challengeInstances")
          .updateOne(
            { challengeId: challengeId, gameId: gameId },
            {   $set: { status: "finished-non-repeatable", finish: finishTimestamp, finalStats: currentStats}
            }
          );

          res.status(400).json({message: "Challenge expired"});   
        }


        const response = await checkChallenge(initial_response, currentStats, requirements);
        // the checkChallenge function returns a boolean. It's not that we're checking if there was a response returned.

        if (response){
          
        const upsertAction = await db
          .collection("challengeInstances")
          .updateOne(
            { challengeId: challengeId, gameId: gameId, status: "started" },
            {   $set: { status: "finished-non-repeatable", finish: Math.ceil(Date.now()/1000), finalStats: currentStats}
            }
          );

        const upsertAction2 = await db
            .collection("users")       
            .updateOne(
                { gameId: gameId },
                {   $inc: { balance: getChallenge?.prize}
                }
            );

          res.status(200).json({message: "Challenge solved"});   
        }else { 
          
          res.status(400).json({message: "Challenge not solved"});
        }   
    } catch (e) {
      res.status(400).json(e);
    }
  }

}
