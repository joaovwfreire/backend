import { User } from "../../../server/mongo/models.js";
import clientPromise from "../../../server/mongo/middleware/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const email = req.body.email;
  const gameId = req.body.game_id;

  if (req.method === "POST" && email && gameId) {
    try {
      const client = await clientPromise;
      const db = client.db("gamepayy");
      console.log(1);
      console.log(email);
      console.log(db);
      const upsertAction = await db
        .collection("users")
        .updateOne(
          { email: email },
          { $set: { gameId: gameId } },
          { upsert: true }
        );
      console.log(upsertAction);
      res.json(upsertAction);
    } catch (e) {
      console.error(e);
      throw new Error(e as string).message;
    }
  }
}
