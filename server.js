require("dotenv").config();
const express = require("express");
const mongoDB = require("./start/db");
const bot = require("./bot");
const app = express();
// const AdminBro = require("admin-bro");
// const adminOptions = require("./admin/admin.options");
// const buildAdminRouter = require("./admin/admin.router");

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION 💥");
//   console.log(err.name, err.message);
//   process.exit(1);
// });
process.on("uncaughtException", (err) => {
  console.log("UNHANDLED Excpections 💥");
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(bot.webhookCallback("/webhook"));
bot.launch().then(() => console.log("Telegram bot ishga tushdi."));

const run = async () => {
  await mongoDB();

  // const admin = new AdminBro(adminOptions);
  // const router = buildAdminRouter(admin);
  // app.use(admin.options.rootPath, router);
  require("./start/routes")(app);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("listening on port " + port));
};
module.exports = run;
