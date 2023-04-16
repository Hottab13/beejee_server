const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const todoSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    еmail: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    complited: {
      type: Boolean,
      required: true,
    },
    editedAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
todoSchema.plugin(mongoosePaginate);
module.exports = model(`Todo`, todoSchema);
