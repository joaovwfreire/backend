import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../server/mongo/middleware/mongodb";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
    const email = req.body.email;
    const steamId = req.body.steam_id;

    if (req.method === "GET") {
      try {
        let response = await axios.get(
            `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/76561198008049283`,
            {
              headers: {
                'TRN-Api-Key': process.env.TRN_API_KEY as string
              },
            }
          );
console.log(response.data)
          res.json(response.data)
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
