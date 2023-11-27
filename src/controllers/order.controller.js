const { Order } = require("../models/order.model");
const bot = require("../../Bot/bot");
const order = {
  getAll: async (req, res) => {
    const orders = await Order.find();
    res.status(200).send(orders);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const orders = await Order.findById(id);
    if (!orders) res.status(404).send("orders not found");
    res.status(200).send(orders);
  },
  add: async (req, res) => {
    const orders = await Order.create(req.body).populate("products.product_id");
    //     let stringData = `
    // Ism ${orders.username}\n
    // Telephone: ${orders.phone}\n
    // Mahsulotlar: ${JSON.stringify(orders.products)}\n
    // Umumiy Summa: ${orders.totalPrice}`;
    // bot.handleUpdate(stringData);

    res.status(201).send(orders);
  },
  upd: async (req, res) => {
    const id = req.params.id;
    const orders = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!orders) return res.status(404).json({ status: "orders not found" });
    res.status(201).json(orders);
  },
  del: async (req, res) => {
    const id = req.params.id;
    const order = await Order.findByIdAndRemove(id);
    if (!order) return res.status(404).json({ success: false, message: "order not found" });

    res.status(200).json({ success: true, data: order });
  },
};

bot.on("text", (ctx) => {
  // Foydalanuvchidan kelgan matni olish
  const messageText = ctx.message.text;
  console.log("ishladi bu");
  // Botga javob yuborish
  ctx.reply(`Siz yuborgan matn: ${messageText}`);
});

module.exports = order;
