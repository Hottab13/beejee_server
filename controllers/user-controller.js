const {
  upgradeUserData,
  upgradeUserPhoto,
  getAllUsers,
  getUsersId,
} = require("../service/user-service");

const getUserId = async (req, res, next) => {
  try {
    const user = await getUsersId(req.params.id);
    return res.json(user);
  } catch (e) {
    next(e);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (e) {
    next(e);
  }
};
const putUserAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fileData = req.file;
    const responseUp = await upgradeUserPhoto(fileData, id);
    res.json(responseUp);
  } catch (e) {
    next(e);
  }
};
const putUserData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const upReqUserData = req.body;
    const userData = await upgradeUserData(upReqUserData, id);
    res.json(userData);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUserId,
  getUsers,
  putUserAvatar,
  putUserData,
};
