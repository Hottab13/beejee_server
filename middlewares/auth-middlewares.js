const ApiErrors = require("../exceptions/error-api");
const { validationAccsessToken } = require("../service/token-service");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log("что приходит в хедре"+authorizationHeader)
    if (!authorizationHeader) {
      return next(ApiErrors.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    console.log(accessToken)
    if (!accessToken) {
      return next(ApiErrors.UnauthorizedError());
    }
    const userData = validationAccsessToken(accessToken);
    if (!userData) {
      return next(ApiErrors.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiErrors.UnauthorizedError());
  }
};
