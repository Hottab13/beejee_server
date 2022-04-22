const User = require('../models/user');
const handlErr = require('../utils/handlErr');
const {generateAccessToken} = require('../utils/authToken');
const jwt = require('jsonwebtoken');

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
            );
                res.status(200).json(token)
            } else {
                handlErr("Ошибка! Логин или пароль не верны!", res.status(500))
            }
        })
        .catch((err) => handlErr(err.message, res.status(500)))
}
const getToken = (req, res) => {
    const token = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return handlErr("Ошибка! Отсутствует токен аунтификации!", res.status(401))
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            if (err) return handlErr(err.message, res.status(403))
            User
                .findOne({
                    email: user.email
                })
                .then((result) => res.status(200).json(result))
                .catch((err) => handlErr(err.message, res.status(500)))
        }
    )
}
const postRegistration = (req, res) => {
    const {
        email,
        password,
        name,
    } = req.body;
    const user = new User({
        email,
        password,
        name,
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
    postRegistration,
    getToken
}