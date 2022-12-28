// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { getAccountData } from "../../../utils/requests";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
){
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    res.status(400).json({Error: "No session"});
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  } else{

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
}
