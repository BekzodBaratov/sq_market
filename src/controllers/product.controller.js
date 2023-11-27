const { Product } = require("../models/product.model");
const { upload_img, delete_img } = require("../helpers/img_upload");

const product = {
  getAll: async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    const products = await Product.findById(id);
    if (!products) res.status(404).send("product not found");
    res.status(200).send(products);
  },
  add: async (req, res) => {
    if (!req.files || !req.files.images) return res.status(400).json({ message: "No image uploaded" });
    if (req.files.images > 4) return res.status(400).json({ message: "Too many pictures, please reduce them." });

    const uploaded_images = [];
    if (Array.isArray(req.files.images)) {
      const images = req.files.images;
      for (let i = 0; i < images.length; i++) {
        const { tempFilePath } = images[i];
        const result = await upload_img(tempFilePath, "products");
        uploaded_images.push({ secure_url: result.secure_url, public_id: result.public_id });
      }
    } else {
      const { tempFilePath } = req.files.images;
      const result = await upload_img(tempFilePath, "products");
      uploaded_images.push({ secure_url: result.secure_url, public_id: result.public_id });
    }

    if (uploaded_images.length) req.body["images"] = uploaded_images;
    const products = await Product.create(req.body);
    res.status(201).send(products);
  },
  upd: async (req, res) => {
    const id = req.params.id;
    const products = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!products) return res.status(404).json({ status: "products not found" });
    res.status(201).json(products);
  },
  del: async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndRemove(id);
    if (!product) return res.status(404).json({ success: false, message: "product not found" });
    for (let i = 0; i < product.images.length; i++) {
      await delete_img(product.images[i].public_id);
    }
    res.status(200).json({ success: true, data: product });
  },
};

module.exports = product;
