import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../server/mongo/middleware/mongodb";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(400).json({ Error: "No session" });
  } else {
    const email = req.body.email;
    const steamId = req.body.steam_id;

    if (req.method === "POST" && email && steamId) {
      try {
        const client = await clientPromise;
        const db = client.db("gamepayy");

        const upsertAction = await db
          .collection("users")
          .updateOne(
            { email: email },
            { $set: { steamId: steamId } },
            { upsert: true }
          );
        res.status(201).json(upsertAction);
      } catch (e) {
        throw new Error(e as string).message;
      }
    }
  }
}
