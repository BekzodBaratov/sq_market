const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const web_link = "https://sq-market-client.vercel.app/";

bot.start((ctx) => {
  ctx.replyWithHTML(
    "<b>Let's get started 🍟</b> \n\nPlease tap the button below to order your perfect lunch!",
    Markup.keyboard([[Markup.button.webApp("Order Food", web_link)]]).resize()
  );
});

bot.on("message", (ctx) => {
  if (ctx.webAppData) {
    const products = ctx.webAppData.data.json().products;
    const photoswithCaption = products.map((val, i) => {
      return { media: val.images[0].secure_url, type: "photo", parse_mode: "HTML" };
    });
    const aboutProducts = products.map((val) => {
      return `\nnomi: ${val.title} \nsoni: ${val.qty} \nnarxi: ${val.price} \n----------------`;
    });
    const caption =
      "<b>Siz tanlagan mahsulotlar!!!</b> \n" +
      aboutProducts.join() +
      `\n\n<i>Umumiy summa ${ctx.webAppData.data.json().totalPrice}so'm</i>`;
    photoswithCaption[0].caption = caption;

    ctx.sendMediaGroup(photoswithCaption);
    ctx.reply("Tez orada siz bilan bog'laniwadi");
  }
});

module.exports = bot;
