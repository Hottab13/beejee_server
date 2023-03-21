const { UserDto } = require("../dtos/auth-dto");
const Event = require("../models/event");
const ImageEvent = require("../models/imageEvent");
const imageUser = require("../models/imageUser");
const { generateAccessToken, saveToken } = require("./token-service");
const ObjectId = require("mongodb").ObjectId;

const resUserData = async (userData) => {
  const arrImgEventsId = [];
  const UserDtos = UserDto(userData);
  const tokens = generateAccessToken({ ...UserDtos });
  await saveToken(UserDtos.id, tokens.refreshToken);
  const userEvents = await Event.find({
    ownerUser: userData.id,
  });
  userEvents.map((el) => {
    arrImgEventsId.push(el._id);
  });
  const imgUser = await imageUser.findOne({ user: new ObjectId(userData._id) });
  const userImgEvents = await ImageEvent.find(
    {
      event: arrImgEventsId,
    },
    "-imgAvatar.img_1000_1000 -field"
  );
  return { ...tokens, user: userData, userImgEvents, userEvents, imgUser };
};

module.exports = { resUserData };
