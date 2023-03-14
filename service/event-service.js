const fs = require("fs");
const path = require("path");
const ObjectId = require("mongodb").ObjectId;

const User = require("../models/user");
const ImageUser = require("../models/imageUser");
const ImageEvent = require("../models/imageEvent");
const Event = require("../models/event");
const ApiErrors = require("../exceptions/error-api");
const { userSharpPhoto } = require("./sharp-service");

const allEventsServise = async () => {
  const events = await Event.find({}, "-imgAvatar.img_1000_1000 -field")
    //.limit(4)
    .sort({
      createdAt: -1,
    });
  const arrOwnerUserEvents = [];
  const arrImgEventsId = [];
  events.map((el) => {
    arrOwnerUserEvents.push(el.ownerUser);
    arrImgEventsId.push(el._id);
  });
  const uniqueId = Array.from(new Set(arrOwnerUserEvents));
  const uniqueUsers = await User.find({
    _id: uniqueId,
  });
  const uniqueImgUsers = await ImageUser.find({
    user: uniqueId,
  });
  const ImgEvents = await ImageEvent.find(
    {
      event: arrImgEventsId,
    },
    "-imgAvatar.img_1000_1000 -field"
  );
  return { events, uniqueUsers, uniqueImgUsers, ImgEvents };
};
const getEventServise = async (id) => {
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка при загрузке события!`);
  }
  const eventProfile = await Event.findById(id);
  const partyUsers = await User.find({
    _id: eventProfile.users,
  });
  const partyUsersImg = await ImageUser.find({
    user: eventProfile.users,
  });
  const eventImg = await ImageEvent.findOne({
    event: id,
  });
  const ownerUserData = await User.findOne({
    _id: eventProfile.ownerUser,
  });
  return { eventProfile, partyUsers, partyUsersImg, eventImg, ownerUserData };
};
const filtrEventServise = async (params) => {
  console.log(params);
  const filtrEventsRes = await Event.find({
    $or: [
      //{ name: params.search || null },
      { type: params.type || "" },
      // { dateOfTheEvent: { $lt: req.body.status } },
    ],
  })
    .limit(20)
    .sort({
      createdAt: -1,
    });
  console.log(filtrEventsRes);
  return filtrEventsRes;
};
const addUserEventServise = async (id, userId) => {
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка при загрузке события!`);
  }
  const result = await Event.findById(id);
  result.users.push(userId);
  result.amountMaximum = result.amountMaximum - 1;
  await result.save();
  return result;
};
const delUserEventServise = async (id, userId) => {
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка при загрузке события!`);
  }
  const result = await Event.findById(id);
  result.users = result.users.find((id) => id !== userId);
  result.amountMaximum = result.amountMaximum + 1;
  await result.save();
  return result;
};
const createEventServise = async (id, data) => {
  if (!data) {
    throw ApiErrors.BadRequest(`Ошибка при создания события!`);
  }
  const eventData = await Event.create({
    name: data.name,
    about: data.about,
    startDate: data.startDate,
    endDate: data.endDate,
    amountMaximum: data.amountMaximum,
    type: data.type,
    ownerUser: id,
    city: data.city,
    address: data.address,
  });
  return eventData;
};
const deleteEventServise = async (id) => {
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка при удалении события!`);
  }
  const resDeleteEvent = await Event.deleteOne({ _id: id });
  return resDeleteEvent;
};
const createEventImgServise = async (fileData, id) => {
  if (!id) {
    throw ApiErrors.BadRequest(`Ошибка при загрузки файла события!`);
  }
  const o_id = new ObjectId(id);
  if (!fileData) {
    throw ApiErrors.BadRequest(`Ошибка при загрузки файла события!`);
  }
  await userSharpPhoto(fileData);
  fs.unlink(path.join(__dirname, "../uploads", fileData.filename),(err => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file:"+fileData.filename);
    }
  }));
  const imgEvent = await ImageEvent.findOne({ event: o_id });
  if (imgEvent) {
    imgEvent.img_200_200 = {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads", "/avatar_thumb.jpg")
      ),
      contentType: "jpg",
      originalname: fileData.originalname,
    };
    imgEvent.img_1000_1000 = {
      data: fs.readFileSync(
        path.join(__dirname, "../uploads", "/avatar_preview.jpg")
      ),
      contentType: "jpg",
      originalname: fileData.originalname,
    };
    return imgEvent.save();
  }
  const createNewEventImg = await ImageEvent.create({
    event: o_id,
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
    createNewEventImg,
  };
};
const editEventDataServise = async (id, data) => {
  const candidate = await Event.findById(id, "-password -field");
  if (!candidate) {
    throw ApiErrors.BadRequest(`Событие ${id} не найдено!`);
  }
  const accessEditEventData = await Event.findByIdAndUpdate(
    id,
    {
      startDate: data.startDate,
      endDate: data.endDate,
      about: data.eventAbout,
      name: data.eventName,
      amountMaximum: data.participantRestriction,
      type: data.eventType,
      city: data.eventCity,
      address: data.eventAddress,
    },
    { new: true }
  );
  return accessEditEventData;
};

module.exports = {
  allEventsServise,
  getEventServise,
  filtrEventServise,
  addUserEventServise,
  delUserEventServise,
  createEventServise,
  deleteEventServise,
  createEventImgServise,
  editEventDataServise,
};
