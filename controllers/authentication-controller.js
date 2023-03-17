const { validationResult } = require("express-validator");

const {
  registrtion,
  activate,
  login,
  logout,
  refresh,
} = require("../service/auth-service");
const ApiErrors = require("../exceptions/error-api");

const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiErrors.BadRequest("Ошибка валидации", errors.array()));
    }
    const { email, password } = req.body;
    const userData = await login(email, password);
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false });
    res.json(userData);
  } catch (e) {
    next(e);
  }
};
const postRegistration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiErrors.BadRequest("Ошибка валидации", errors.array()));
    }
    const { email, password, userName } = req.body;
    const userData = await registrtion(email, password, userName);
    res.json(userData);
  } catch (e) {
    next(e);
  }
};
const postLogout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (e) {
    next(e);
  }
};
const getActivate = async (req, res, next) => {
  try {
    const activLink = req.params.link;
    await activate(activLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    next(e);
  }
};

const getRefresh = async (req, res, next) => {
  try {
    console.log(req)
    const { refreshToken } = req.cookies;
    console.log("кука"+refreshToken)
    const userData = await refresh(refreshToken);
    console.log("Какой токен вернет"+userData.refreshToken)
    res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false, secure: false });
    res.json(userData);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  postLogout,
  getRefresh,
  getActivate,
  postLogin,
  postRegistration,
};
