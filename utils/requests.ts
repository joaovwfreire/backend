import axios from "axios";
import client from "../server/mongo/dbSetup";
const { Client } = require("fnbr");
import SteamIDConverter from "./steamIdConverter.js";

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

async function getCsgoPlayerStats(id: number) {
  let response = await axios.get(
    `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${id}`,
    {
      headers: {
        "TRN-Api-Key": `${process.env.TRN_API_KEY}`,
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

async function getDota2Matches(steamId: number){
    const steamId3 = SteamIDConverter.toSteamID3(steamId);
    let response = await axios.get(
        `https://api.opendota.com/api/players/${steamId3}/matches`,
        
      );

      return response.data
}

export { getAccountData, getId, getStats, getCsgoPlayerStats, getDota2Matches };
