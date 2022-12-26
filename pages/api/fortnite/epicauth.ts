// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Client } = require("fnbr");

async function getAccountData(key: string){

  const auth = { authorizationCode: key };
      
  const client = new Client({ auth });
  await client.login();
  
  return ({id: client.user.id, userName: client.user.displayName});
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
){
    
  const key = req.body.key;
    
  if (req.method === 'POST' && key) {
    try{

      const response = await getAccountData(key);
      res.status(200).json(response);
    } catch(e){

      res.status(400).json(e);
    }
  }
}
