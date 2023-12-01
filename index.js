require("dotenv").config();
const express = require("express");
const bot = require("./bot");
const app = express();

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

require("./start/routes")(app);
require("./start/db")();

app.use(bot.webhookCallback("/webhook"));
bot.launch().then(() => console.log("Telegram bot ishga tushdi."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port " + port));
