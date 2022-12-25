
import { User } from "../../../server/mongo/models.js";
import client from "../../../server/mongo/dbSetup";
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()




async function getId(eMail: string){
        client.connect()
        const collection = client.db("gamePayy").collection("users");
        // perform actions on the collection object
        const userData = await User.findOne({ email: eMail})  
        console.log(userData)

        return userData

}

type Data = {
  blockNumber: number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>){
    
    const userEmail = req.body.email;
  
    if (req.method === 'POST' && userEmail) {
      
      try{
        const stats = await getId(userEmail)
        
        res.json(stats) 
      }catch(e){
        res.status(400).json(e)
      }
      }
  }