const { body } = require("express-validator");
const Router = require("express");
const router = new Router();

const {
  postLogin,
  postRegistration,
  postLogout,
  getRefresh,
  getActivate,
} = require("../controllers/authentication-controller");

router.post(
  "/registration",
  body("email", "Невалидное поле email")
    .notEmpty()
    .withMessage("Поле email является обязательным")
    .isLength({ min: 5, max: 100 })
    .withMessage("Длина email не может быть более 100 или менее 5 символов")
    .isEmail()
    .withMessage("Невалидный email"),
  body("password", "Невалидное поле password")
    .notEmpty()
    .withMessage("Поле password является обязательным")
    .matches(/\d/)
    .withMessage("Пароль должен содержать цифры")
    .isLength({ min: 5, max: 100 })
    .withMessage("Длина password не может быть более 100 или менее 5 символов"),
  postRegistration
);
router.post(
  "/login",
  body("email", "Невалидное поле email")
    .notEmpty()
    .withMessage("Поле email является обязательным")
    .isLength({ min: 5, max: 50 })
    .withMessage("Длина email не может быть более 50 или менее 5 символов")
    .isEmail()
    .withMessage("Невалидный email"),
  body("password", "Невалидное поле password")
    .notEmpty()
    .withMessage("Поле password является обязательным")
    .matches(/\d/)
    .withMessage("Пароль должен содержать цифры")
    .isLength({ min: 5, max: 20 })
    .withMessage("Длина password не может быть более 20 или менее 5 символов"),
  postLogin
);
router.post("/logout", postLogout);
router.get("/activate/:link", getActivate);
router.get("/refresh", getRefresh);

module.exports = router;
