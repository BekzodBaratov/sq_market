const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const web_link = "https://sq-market-client.vercel.app/";

bot.start((ctx) => {
  ctx.reply("Assalomu alaykum.\n botga xush kelibsiz \n🛒 tugmasini bosing.", {
    reply_markup: {
      keyboard: [[{ text: "🛒", web_app: { url: web_link } }]],
    },
  });
});

bot.on("message", (ctx) => {
  console.log(ctx);
  ctx.reply(JSON.stringify(ctx.message));
});

module.exports = bot;
