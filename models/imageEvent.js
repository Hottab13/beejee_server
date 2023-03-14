const { Schema, model } = require("mongoose");

const imageEventSchema = Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
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

module.exports = model("ImageEvent", imageEventSchema);
