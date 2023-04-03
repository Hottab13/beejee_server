const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;

const User = require("../models/user");
const Event = require("../models/event");
const ImageUser = require("../models/imageUser");
const ApiErrors = require("../exceptions/error-api");
const { userSharpPhoto } = require("./sharp-service");
const imageEvent = require("../models/imageEvent");

const upgradeUserData = async (upReqUserData, id) => {
  const candidate = await User.findById(id, "-password -field");
  if (!candidate) {
    throw ApiErrors.BadRequest(`Пользователь ${email} не найден!`);
  }
  const accessUpUserData = await User.findByIdAndUpdate(id, {
    data: {
      userName:upReqUserData.data.userName,
      userSurname:upReqUserData.data?.userSurname || null,
      userGender:upReqUserData.data?.userGender || null,
      userPhone:upReqUserData.data?.userPhone || null,
      usersDateBirth:upReqUserData.data?.usersDateBirth || null,
    },
  }, {new: true});
  return accessUpUserData;
};
const upgradeUserPhoto = async (fileData, id) => {
  const o_id = new ObjectId(id);
  if (!fileData) {
    throw ApiErrors.BadRequest(`Ошибка при загрузке файла!`);
  }
  await userSharpPhoto(fileData);
  fs.unlink(path.join(__dirname, "../uploads", fileData.filename),(err => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file:"+fileData.filename);
    }
  }));
  const imgUser = await ImageUser.findOne({ user: o_id });
  if (imgUser) {
    imgUser.img_200_200 = {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads", "/avatar_thumb.jpg")
      ),
      contentType: "jpg",
      originalname: fileData.originalname,
    };
    imgUser.img_1000_1000 = {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads", "/avatar_preview.jpg")
      ),
      contentType: "jpg",
      originalname: fileData.originalname,
    };
    return imgUser.save();
  }
  const createNewUserImg = await ImageUser.create({
    user: o_id,
    img_200_200: {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads", "/avatar_thumb.jpg")
      ),
      contentType: "jpg",
      originalname: fileData.originalname,
    },
    img_1000_1000: {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads", "/avatar_preview.jpg")
      ),
      contentType: "jpg",
      originalname: fileData.originalname,
    },
  });
  return {
    createNewUserImg,
  };
};

const getUsersId = async (id) => {
  const arrImgEventsId = [];
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка при загрузке пользователя!`);
  }
  const userData = await User.findById(id, "-password -field");
  const imgUser = await ImageUser.findOne({ user: new ObjectId(id) });
  const userEvents = await Event.find({
    ownerUser:id,
  });
  userEvents.map((el) => {
    arrImgEventsId.push(el._id);
  });
  const userImgEvents = await imageEvent.find(
    {
      event: arrImgEventsId,
    },
    "-imgAvatar.img_1000_1000 -field"
  );
  return { userData, imgUser, userEvents,userImgEvents };
};

const getAllUsers = async () => {
  const users = await User.find({}, "-password -field").limit(20).sort({
    createdAt: -1,
  });
  return users;
};

module.exports = { upgradeUserData, upgradeUserPhoto, getAllUsers, getUsersId };
