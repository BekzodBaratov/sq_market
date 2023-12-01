const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const web_link = "https://sq-market-client.vercel.app/";
// const web_link = "http://localhost:5173/";

bot.start((ctx) => {
  ctx.replyWithHTML(
    "<b>Let's get started 🍟</b> \n\nPlease tap the button below to order your perfect lunch!",
    Markup.inlineKeyboard([[Markup.button.webApp("Order Food", web_link)]])
  );
});

bot.on("message", (ctx) => {
  console.log(ctx);
  ctx.reply(JSON.stringify({ message: ctx.message }));
});

module.exports = bot;
