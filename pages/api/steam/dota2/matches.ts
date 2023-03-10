import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../server/mongo/middleware/mongodb";
import SteamIDConverter from "../../../../utils/steamIdConverter.js";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
    
    const steamId = req.query.steam_id;
    
    const steamId3 = SteamIDConverter.toSteamID3(steamId);

    
    if (req.method === "GET") {
      try {
        let response = await axios.get(
            `https://api.opendota.com/api/players/${steamId3}/matches`,
            
          );

          res.json(response.data)
        
      } catch (e) {
        res.status(500).json({ error: e });
      }
    }
  
}
