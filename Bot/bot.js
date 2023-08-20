const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const web_link = "https://sq-market-client.vercel.app/";

bot.start((ctx) => ctx.reply("salom"));
bot.command("bot", (ctx) => {
  ctx.reply("bot", {
    reply_markup: {
      keyboard: [[{ text: "bot", web_app: { url: web_link } }]],
    },
  });
});

module.exports = bot;
