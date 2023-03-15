const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

const Token = require("../models/token");

const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30D",
  });
  return {
    accessToken,
    refreshToken,
  };
};
const saveToken = async (user, refreshToken) => {
  const o_id = new ObjectId(user);
  const tokenData = await Token.findOne({ user: o_id });
  if (tokenData) {
    console.log("Токен есть"+tokenData)
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({ user, refreshToken });
  console.log("Токена нету"+token)
  return token;
};
const removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });
  return tokenData;
};
const findToken = async (refreshToken) => {
  const tokenData = await Token.findOne({ refreshToken:refreshToken });
  return tokenData;
};
const validationAccsessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};
const validationRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  saveToken,
  removeToken,
  validationAccsessToken,
  validationRefreshToken,
  findToken,
};
