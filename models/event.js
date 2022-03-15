const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
        type:String,
        required:true
    },
    ageRestrictions:{
        type:String,
        required:true
    },
    amountMaximum:{
        type:String,
        required:true
    },
    ageRestrictions:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    imgAvatarId:{
        type:String,
        //required:true
    },
   
},{timestamps:true})// вторым аргументом конструктора можно добавить атрибут, например для записи времени создания

const Event = mongoose.model(`Event`, eventSchema );
module.exports = Event;