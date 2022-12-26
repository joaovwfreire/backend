// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Client } = require("fnbr");

async function getAccountData(key: string) {
  console.log(key);

  const auth = { authorizationCode: key };
  console.log({ auth });
  const client = new Client({ auth });

  await client.login();
  console.log(client.user.id); // this is all we need
  console.log(`Logged in as ${client.user.displayName}`);

  return client.user.id;
}

type Data = {
  blockNumber: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const key = req.body.key;

  if (req.method === "POST" && key) {
    try {
      const id = await getAccountData(key);
      console.log(id);
      res.json(id);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }
}
