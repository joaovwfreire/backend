import { User } from "../../../server/mongo/models.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getId } from "../../../utils/requests";
import clientPromise from "../../../server/mongo/middleware/mongodb";

require("dotenv").config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(400).json({ Error: "No session" });
  } else {
    const adminEmail = req.body.email;

    const gameId = req.body.game_id;
    const difficulty = req.body.difficulty;
    const entryFee = req.body.entry_fee;
    const prize = req.body.prize;
    const statusChange = req.body.stats;
    const duration = req.body.duration;
    const expiry = req.body.expiry;


    if (req.method === "POST" && adminEmail && gameId && statusChange && duration && expiry && difficulty && entryFee && prize) {
      try {
        
        const client = await clientPromise;
        const db = client.db("gamepayy");

        const upsertAction = await db
          .collection("challenges")
          .updateOne(
            { challengeId: Math.ceil(Date.now()/1000), gameId: gameId },
            {  // $set: { challengeId: 1, gameId: gameId, status: "started"},
                $setOnInsert: { challengeId: Math.ceil(Date.now()/1000), gameId: gameId, duration: duration, expiry: expiry, statusChange: statusChange, entryFee: entryFee, prize: parseInt(prize), difficulty: difficulty, winnersAmount: 0, firstWinnerId: '' }
            },
            { upsert: true }
          );


        res.status(200).json({message: "Challenge succesfully processed", upsertAction});
      } catch (e) {
        res.status(400).json(e);
      }
    } else{
        res.status(400).json({Error: "Missing fields"});
    }
  }
}
