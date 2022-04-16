const mongoose = require('mongoose');
const nowDate = new Date();
const nowDate_365 = new Date();
nowDate_365.setDate(nowDate_365.getDate() + 365);

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: mongoose.Decimal128,
            //required: true
        },
        lon: {
            type: mongoose.Decimal128,
            //required: true
        },
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dateOfTheEvent:[{
        //type: String
        type: Date,
        //min: nowDate,
        //max: nowDate_365,
        //required: true
    }],
    ageRestrictions: {
        type: Number,
        min: 18,
        max: 65,
        required: true
    },
    amountMaximum: {
        type: Number,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       // required: true
    }],
    imgAvatar: {
        img_200_200:
        {
            data: Buffer,
            contentType: String,
            originalname: String
        },
        img_1000_1000:
        {
            data: Buffer,
            contentType: String,
            originalname: String
        }
    },
    ownerUser: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const Event = mongoose.model(`Event`, eventSchema);
module.exports = Event;