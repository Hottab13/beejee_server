const User = require('../models/user');
const jwt = require('jsonwebtoken');
const handlErr = require('../utils/handlErr');
require('dotenv').config();
const chalk = require('chalk');
const SuccessMsg = chalk.bgWhite.green;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return handlErr("Ошибка! Отсутствует токен аунтификации!",res.status(401))
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) return handlErr(err.message,res.status(403))
      console.log(SuccessMsg(user.email))
      User
        .findOne({
          email:user.email
        })
        .then(() => {
          next()
        })
        .catch((err) => handlErr(err.message,res.status(500)))
    })
  }

  const generateAccessToken = (email, userId) => {
      const tokenJson = {
          accessToken: jwt.sign(email, process.env.TOKEN_KEY, {
              expiresIn: '30d'
          }),
          userId
      }
      return tokenJson;
  }
  
  module.exports = {
      authenticateToken,
      generateAccessToken
  };