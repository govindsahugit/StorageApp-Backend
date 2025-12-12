import { createClient } from "redis";

const redisClient = await createClient({
  // password: process.env.REDIS_PASSWORD,
  url: process.env.REDIS_CONNECTION_URL,
}).connect();

redisClient.on("error", (err) => console.log(`Error In Redis: ${err}`));

export default redisClient;
