const uuid = require("uuid");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

const ImageUser = require("../models/imageUser");
const Event = require("../models/event");
const User = require("../models/user");
const ApiErrors = require("../exceptions/error-api");
const { UserDto } = require("../dtos/auth-dto");
const { sendActivationMail } = require("./mail-service");
const {
  generateAccessToken,
  saveToken,
  removeToken,
  validationRefreshToken,
  findToken,
} = require("./token-service");

const saltRounds = 7;

const registrtion = async (email, password, userName) => {
  const activLink = uuid.v4();
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw ApiErrors.BadRequest(`Пользователь ${email} уже существует!`);
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const userData = await User.create({
    email,
    password: hashPassword,
    activLink,
    data: {
      userName,
    },
  });
  const UserDtos = UserDto(userData);
  await sendActivationMail(
    email,
    `${process.env.API_URL}api/activate/${activLink}`
  );
  const tokens = generateAccessToken({ ...UserDtos });
  await saveToken(UserDtos.id, tokens.refreshToken);
  return {
    ...tokens,
    user: UserDtos,
  };
};
const activate = async (activLink) => {
  const user = await User.findOne({ activLink });
  if (!user) {
    throw ApiErrors.BadRequest(`Некоректная ссылка активации!`);
  }
  user.isActivated = true;
  await user.save();
};
const login = async (email, password) => {
  const userData = await User.findOne({ email });
  if (!userData) {
    throw ApiErrors.BadRequest(`Пользователь ${email} не найден!`);
  }
  const o_id = new ObjectId(userData._id);
  const imgUser = await ImageUser.findOne({ user: o_id });
  const isPassEquals = await bcrypt.compare(password, userData.password);
  if (!isPassEquals) {
    throw ApiErrors.BadRequest(`Не верный пароль!`);
  }
  const UserDtos = UserDto(userData);
  const tokens = generateAccessToken({ ...UserDtos });
  await saveToken(UserDtos.id, tokens.refreshToken);
  const userEvents = await Event.find({
    ownerUser:userData._id,
  });
  return {
    ...tokens,
    user: userData,
    imgUser,
    userEvents
  };
};
const logout = async (refreshToken) => {
  const token = await removeToken(refreshToken);
  return token;
};
const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiErrors.UnauthorizedError();
  }
  const userData = validationRefreshToken(refreshToken);
  const tokenFreshDb = await findToken(refreshToken);
  if (!userData || !tokenFreshDb) {
    throw ApiErrors.UnauthorizedError();
  }
  const o_id = new ObjectId(userData.id);
  const imgUser = await ImageUser.findOne({ user: o_id });
  const user = await User.findById(userData.id);
  const UserDtos = UserDto(user);

  const tokens = generateAccessToken({ ...UserDtos });
  await saveToken(UserDtos.id, tokens.refreshToken);
  
  const userEvents = await Event.find({
    ownerUser: userData.id,
  });

  return {
    ...tokens,
    user: user,
    imgUser,
    userEvents,
  };
};

module.exports = { registrtion, activate, login, logout, refresh };
