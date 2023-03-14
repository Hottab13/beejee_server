const { Schema, model } = require("mongoose");

const imageUserSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    img_200_200: {
      data: Buffer,
      contentType: String,
      originalname: String,
    },
    img_1000_1000: {
      data: Buffer,
      contentType: String,
      originalname: String,
    },
  },
  { timestamps: true }
);

module.exports = model("ImageUser", imageUserSchema);
