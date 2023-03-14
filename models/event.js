const { Schema, model, Decimal128 } = require("mongoose");
/*const nowDate = new Date();
const nowDate_365 = new Date();
nowDate_365.setDate(nowDate_365.getDate() + 365);*/

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    /*location: {
        lat: {
            type: Decimal128,
            //required: true
        },
        lon: {
            type: Decimal128,
            //required: true
        },
    },*/
    address: {
      type: String,
      // required: true
    },
    city: {
      type: String,
      // required: true
    },
    type: {
      type: String,
      //required: true
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    dateOfTheEvent: [
      {
        type: Date,
      },
    ],
    /*ageRestrictions: {
        type: Number,
        min: 18,
        max: 65,
    },*/
    amountMaximum: {
      type: Number,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ownerUser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model(`Event`, eventSchema);
