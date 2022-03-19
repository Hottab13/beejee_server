const Event = require('../models/event');
const handlErr = require('../utils/handlErr');

const getEvent = (req, res) => {
    Event
        .findById(req.params.id)
        .then((event) => res.status(200).json(event))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const getEventsUser = (req, res) => {
    Event
        .find({
            userId: req.params.id
        })
        .limit(20)
        .sort({
            createdAt: -1
        })
        .then((event) => res.status(200).json(event))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const getEvents = (req, res) => {
    Event
        .find()
        .limit(20)
        .sort({
            createdAt: -1
        })
        .then((events) => {
            res.status(200).json(events)
        })
        .catch((err) => handlErr(err.message, res.status(500)))
}
const postAddEvent = (req, res) => {
    const {
        name,
        locationLat,
        locationLon,
        address,
        city,
        type,
        finalData,
        ageRestrictions,
        amountMaximum,
        users,
        imgAvatarId
    } = req.body;

    const event = new Event({
        name,
        location:{
            lat:locationLat,
            lon:locationLon
        },
        address,
        city,
        type,
        finalData,
        ageRestrictions,
        amountMaximum,
        users,
        imgAvatarId
    })
    event
        .save()
        .then((result) => res.status(200).json(result))
        .catch((err) => handlErr(err.message, res.status(500)));
}
const deleteEvent = (req, res) => {
    Event
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const putEvent = (req, res) => {
    const {
        name,
        location,
        address,
        city,
        type,
        finalData,
        ageRestrictions,
        amountMaximum,
        users,
        imgAvatarId
    } = req.body;
    const {
        id
    } = req.params;
    Event
        .findByIdAndUpdate(id, {
            name,
            location,
            address,
            city,
            type,
            finalData,
            ageRestrictions,
            amountMaximum,
            users,
            imgAvatarId
        })
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
}
module.exports = {
    getEvent,
    getEvents,
    postAddEvent,
    deleteEvent,
    putEvent,
    getEventsUser
}