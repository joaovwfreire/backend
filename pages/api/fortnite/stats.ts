// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function getStats(id: number) {
  let response = await axios.get(
    `https://fortnite-api.com/v2/stats/br/v2/${id}`,
    {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    }
  );

  if (response.status == 200) {
    const stats = response.data.data.stats.all;

    return stats;
  } else {
    return response.status;
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userId = req.body.id;

  if (req.method === "POST" && userId) {
    try {
      const stats = await getStats(userId);

      res.status(200).json(stats);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}
