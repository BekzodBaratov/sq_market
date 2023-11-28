require("dotenv").config();
const express = require("express");
const app = express();
const bot = require("./Bot/bot");

if (process.env.NODE_ENV !== "production") {
  bot.startPolling();
} else {
  app.use(bot.webhookCallback("/SQ"));
  bot.telegram.deleteWebhook();
  bot.telegram.setWebhook("https://sqmarket-production.up.railway.app/api/v1/SQ");
}

// Unhandeled Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥");
  console.log(err.name, err.message);
  process.exit(1);
});

// Unhandled Excpections
process.on("uncaughtException", (err) => {
  console.log("UNHANDLED Excpections 💥");
  console.log(err.name, err.message);
  process.exit(1);
});
// app.use(bot.webhookCallback("/webhook"));
// bot.launch().then(() => console.log("Telegram bot ishga tushdi."));

require("./start/routes")(app);
require("./start/db")();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port " + port));

bot.catch((err) => {
  console.log("Ooops", err);
});
