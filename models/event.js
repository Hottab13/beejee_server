const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const nowDate = new Date();
const nowDate_300 = new Date();
nowDate_300.setDate(nowDate_300.getDate() + 300);
const eventSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    locationLat: {
        type: mongoose.Decimal128,
        required: true
        },
    locationLon: {
        type: mongoose.Decimal128,
        required: true
        },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    finalData:{
        type:Date,
        min: nowDate,
        max: nowDate_300,
        required:true
    },
    ageRestrictions: {
        type: Number,
        min: 18,
        max: 65,
        required: true
    },
    amountMaximum:{
        type:Number,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    imgAvatarId:{
        type:Schema.Types.ObjectId,
    },
   
},{timestamps:true})// вторым аргументом конструктора можно добавить атрибут, например для записи времени создания

const Event = mongoose.model(`Event`, eventSchema );
module.exports = Event;