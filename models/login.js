const { Schema, model } = require("mongoose");

const loginSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model(`Login`, loginSchema);
