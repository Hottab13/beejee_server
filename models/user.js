const { Schema, model } = require("mongoose");
const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activLink: {
      type: String,
    },
    data: {
      userName: {
        type: String,
        required: true,
      },
      userSurname: {
        type: String || null,
      },
      userGender: {
        type: String || null,
      },
      userPhone: {
        type: String || null,
      },
      usersDateBirth: {
        type: Date || null,
      },
      status: {
        type: String,
      },
      aboutMe: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = model(`User`, userSchema);
