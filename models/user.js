const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
        //required:true
    },
    sex:{
        type:String,
        //required:true
    },
    age:{
        type:String,
        //required:true
    },
    status:{
        type:String,
        //required:true
    },
    aboutMe:{
        type:String,
        //required:true
    },
    imgAvatarId:{
        type:String,
        //required:true
    },
},{timestamps:true})// вторым аргументом конструктора можно добавить атрибут, например для записи времени создания

const User = mongoose.model(`User`, userSchema );/*создание модели, имя пишется с большой буквы как 
и имя конструктора, внутрь передаётся 2 аргумента, 1 это имя модели, 2 имя схемы, которая данная модель будет использовтаь*/

module.exports = User;