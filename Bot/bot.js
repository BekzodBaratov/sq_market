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
  // console.log(ctx);
  ctx.reply(JSON.stringify(ctx.message));
  console.log(ctx.message);
  if (ctx.message.web_app) {
    console.log(ctx.message.web_app);

    ctx.sendMediaGroup([
      {
        media:
          "https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg",
        type: "photo",
        caption: "**My caption**",
      },
      {
        media:
          "https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg",
        type: "photo",
      },
    ]);
  }
});

module.exports = bot;
