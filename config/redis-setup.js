import { createClient } from "redis";

const redisClient = await createClient({
  password: process.env.REDIS_PASSWORD,
}).connect();

redisClient.on("error", (err) => console.log(`Error In Redis: ${err}`));

try {
  await redisClient.ft.create(
    "userIdIdx",
    {
      "$.userId": { type: "TAG", AS: "userId" },
    },
    {
      ON: "JSON",
      PREFIX: "session:",
    }
  );
} catch (error) {
  console.log(error.message);
}

redisClient.quit();

export default redisClient;
