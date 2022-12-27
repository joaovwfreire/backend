import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://jovi:${process.env.MONGO_DB_PASSWORD}@cluster0.n32qot2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

export default client;
