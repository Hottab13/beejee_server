const User = require('../models/user');
const handlErr = require('../utils/handlErr');
const {generateAccessToken} = require('../utils/authToken');

const getLogin = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User
        .findOne({
            email,
            password
        })
        .then((result) => {
            if (result) {
                const token = generateAccessToken({
                    email: req.body.email
                },
                result._id
            );/*
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');
  
  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);*/
                res.status(200).json(token)
            } else {
                handlErr("Ошибка! Логин или пароль не верны!", res.status(500))
            }
        })
        .catch((err) => handlErr(err.message, res.status(500)))
}
const postRegistration = (req, res) => {
    const {
        email,
        password,
        name,
        surname,
        sex,
        age,
        status,
        aboutMe,
        imgAvatarId
    } = req.body;
    const user = new User({
        email,
        password,
        name,
        surname,
        sex,
        age,
        status,
        aboutMe,
        imgAvatarId
    })
    user
        .save()
        .then((result) => {
            const token = generateAccessToken({
                    email: req.body.email
                },
                result._id
            );
            res.status(200).json(token)
        })
        .catch((err) => handlErr(err.message, res.status(500)))
}

module.exports = {
    getLogin,
    postRegistration
}