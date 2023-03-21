const {
  getEventServise,
  allEventsServise,
  filtrEventServise,
  addUserEventServise,
  delUserEventServise,
  createEventServise,
  deleteEventServise,
  createEventImgServise,
  editEventDataServise,
} = require("../service/event-service");

const getAllEvents = async (req, res, next) => {
  try {
    console.log(req.query.limit)
    console.log(req.query.type)
    
    const events = await allEventsServise();
    return res.json(events);
  } catch (e) {
    next(e);
  }
};
const postFiltrEvent = async (req, res, next) => {
  try {
    const params = req.body;
    const filtrEventsRes = await filtrEventServise(params);
    return res.json(filtrEventsRes);
  } catch (e) {
    next(e);
  }
};
const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventProfile = await getEventServise(id);
    return res.json(eventProfile);
  } catch (e) {
    next(e);
  }
};
const addUserEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const resAddUserEvent = await addUserEventServise(id, userId);
    return res.json(resAddUserEvent);
  } catch (e) {
    next(e);
  }
};
const createEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const resСreateEvent = await createEventServise(id, data);
    return res.json(resСreateEvent);
  } catch (e) {
    next(e);
  }
};
const createEventImg = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fileData = req.file;
    const responseCreateEventImg = await createEventImgServise(fileData, id);
    res.json(responseCreateEventImg);
    return res.json(responseCreateEventImg);
  } catch (e) {
    next(e);
  }
};
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resDeleteEvent = await deleteEventServise(id);
    return res.json(resDeleteEvent);
  } catch (e) {
    next(e);
  }
};
const delUserEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const resDelUserEvent = await delUserEventServise(id, userId);
    return res.json(resDelUserEvent);
  } catch (e) {
    next(e);
  }
};
const editEventData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const resEditEvent = await editEventDataServise(id, data);
    return res.json(resEditEvent);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllEvents,
  postFiltrEvent,
  getEvent,
  addUserEvent,
  delUserEvent,
  createEvent,
  createEventImg,
  deleteEvent,
  editEventData,
};
