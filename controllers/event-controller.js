const Event = require('../models/event');
const handlErr = require('../utils/handlErr');
var sharp = require('sharp');
var fs = require('fs');
var path = require('path');


const getEvent = (req, res) => {
    Event
        .findById(req.params.id)
        .then((event) => res.status(200).json(event))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const getEventsUser = (req, res) => {
    Event
        .find({
            ownerUser: req.params.id
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
        .find({
            //dateOfTheEvent:{ $gt: new Dete()}
            /* фильтр */
        }, '-imgAvatar.img_1000_1000 -field'
        )
        //{"dateOfTheEvent":{"$lt":new Date()}}
        .limit(36)
        .sort({
            createdAt: -1
        })
        .then((events) => {
            res.status(200).json(events)
        })
        .catch((err) => handlErr(err.message, res.status(500)))
}
const postAddEvent =  async (req, res) => {
    await sharp(path.join(__dirname, '../uploads', req.file.filename)).resize(200, 200)
        .jpeg({
            quality: 50
        }).toFile(path.join(__dirname, '../uploads',
            '/avatar_thumb.jpg'));

            await sharp(path.join(__dirname, '../uploads', req.file.filename)).resize(1000, 1000)
        .jpeg({
            quality: 80
        }).toFile(path.join(__dirname, '../uploads',
            '/avatar_preview.jpg'));
    const {
        name,
        locationLat,
        locationLon,
        address,
        city,
        type,
        dateOfTheEvent,
        ageRestrictions,
        amountMaximum,
        users,
        ownerUser,
        description
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
        dateOfTheEvent,
        ageRestrictions,
        amountMaximum,
        users,
        imgAvatar:{
            img_200_200: {
                data: fs.readFileSync(path.join(__dirname, '../uploads',
                    '/avatar_thumb.jpg')),
                contentType: 'jpg',
                originalname: req.file.originalname
            },
            img_1000_1000: {
                data: fs.readFileSync(path.join(__dirname, '../uploads',
                    '/avatar_preview.jpg')),
                contentType: 'jpg',
                originalname: req.file.originalname
            },
        },
        ownerUser,
        description
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
    console.log(req.body)
    console.log(req.params)
    console.log(req.file)
    const {
        name,
        //location,
        address,
        city,
        type,
        dateOfTheEvent,
        ageRestrictions,
        amountMaximum,
        users,
        ownerUser,
        description,
    } = req.body;
    const {
        id
    } = req.params;
    Event
        .findByIdAndUpdate(id, {
            name,
           // location,
            address,
            city,
            type,
            dateOfTheEvent,
            ageRestrictions,
            amountMaximum,
            users,
            /*imgAvatar:{
                img_200_200,
                img_1000_1000,
            },*/
            ownerUser,
            description
        })
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
} 
const ubdateMembersEvent = (req, res) => {
    const {
        amountMaximum,
        users,
    } = req.body;
    Event
        .findByIdAndUpdate(req.params.id, {
            amountMaximum,
            users,
        })
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const filtrEvent = (req, res) => {
console.log(req.body)
/*switch (req.body) {
    case stutus:
        console/log("попал")
      return 
      default: return }*/
    Event.find({
      /*$and: [
                {*/
      $or: [
        { city: req.body.city },
        { type: req.body.type },
        { dateOfTheEvent: { $lt: req.body.status } },
      ],
      /* },
                {
                  $or: [
                    { city: req.body.city },
                { type: req.body.type }
                  ]
                }
              ]*/
    })
      .limit(36)
      .sort({
        createdAt: -1,
      })
      .then((event) => res.status(200).json(event))
      .catch((err) => handlErr(err.message, res.status(500)));
}
module.exports = {
    getEvent,
    getEvents,
    postAddEvent,
    deleteEvent,
    putEvent,
    getEventsUser,
    ubdateMembersEvent,
    filtrEvent
}