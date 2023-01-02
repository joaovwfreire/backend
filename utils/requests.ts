import axios from "axios";
import client from "../server/mongo/dbSetup";
const { Client } = require("fnbr");

async function getAccountData(key: string) {
  const auth = { authorizationCode: key };

  const client = new Client({ auth });
  await client.login();

  return { id: client.user.id, userName: client.user.displayName };
}

async function getId(eMail: string) {
  client.connect();
  const collection = client.db("gamepayy").collection("users");

  const userData = await collection.findOne({ email: eMail });
  return userData;
}

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

export { getAccountData, getId, getStats };
