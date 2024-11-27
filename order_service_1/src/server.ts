import { ExpressApp } from "./app";

const PORT = process.env.APP_PORT || 9000;

export const StartServer = async () => {
    const expressApp = await ExpressApp();
  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("server is up");
});
