const mongoose = require('mongoose');
const dateAge = new Date();
dateAge.setDate(dateAge.getDate() - 4380);
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
    },
    sex:{
        type:Boolean,
    },
    age:{
        type:Date,
        //min: '1925-00-00',
        //max: dateAge
    },
    status:{
        type:String,
    },
    aboutMe:{
        type:String,
    },
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
},{timestamps:true})

const User = mongoose.model(`User`, userSchema );

module.exports = User;