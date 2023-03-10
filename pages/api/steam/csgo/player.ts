import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../server/mongo/middleware/mongodb";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
    
    const steamId = req.query.steam_id;

    if (req.method === "GET") {
      try {
        console.log(process.env.TRN_API_KEY)

        let response = await axios.get(
            `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamId}`,
            {
              headers: {
                'TRN-Api-Key': 'c4778ee4-2b57-4243-9ec9-a397afa8ebd8'
              }
            }
          );
          console.log(response)

          res.json(response.data)
        
      } catch (e) {
        throw new Error(e as string).message;
      }
    }
  
}
