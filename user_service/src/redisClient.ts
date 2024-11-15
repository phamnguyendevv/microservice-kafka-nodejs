
import { createClient } from "redis";

const client = createClient({
  password: "gpa5OW9F8qTQ39Cicqme7OLAi48m7mnN",
  socket: {
    host: "redis-16930.c302.asia-northeast1-1.gce.redns.redis-cloud.com",
    port: 16930,
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  await client.connect();
  console.log("Connected to Redis");
})();

export default client;
