const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, maxLength: 128, minLength: 3 },
  },
  { timestamps: true }
);

const User = mongoose.model("users", schema);
module.exports = { User };
