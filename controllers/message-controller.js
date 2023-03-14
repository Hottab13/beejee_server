const Message = require('../models/message');

/*Message.find(({ users: { "$in" : [#user1#,#user2#]} })
    .sort({ updatedAt: -1 })
    .limit(20)*/
const getMeagesReqestUser = (req, res) => {
    Message
        .find({
            user: req.params.id
        })
        .sort({
            updatedAt: -1
        })
        .limit(20)
        .then((event) => res.status(200).json(event))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const getMeagesSenderUser = (req, res) => {
    Message
        .find({
            sender: req.params.id
        })
        .sort({
            updatedAt: -1
        })
        .limit(20)
        .then((event) => res.status(200).json(event))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const postAddMessage = (req, res) => {
    const {
        text,
        users,
        sender_id,
        delivered,
        readText,
        read
    } = req.body;
    const message = new Message({
        message: {
            text: text,
            delivered,
            read: readText
        },
        users,
        sender: sender_id,
        read
    })
    message
        .save()
        .then((result) => res.status(200).json(result))
        .catch((err) => handlErr(err.message, res.status(500)));
}
const deleteMessage = (req, res) => {
    Message
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
}
const putMessage = (req, res) => {
    console.log(req.body)
    const {
        text,
        users,
        sender_id,
        delivered,
        readText,
        read
    } = req.body;
    const {
        id
    } = req.params;
    Message
        .findByIdAndUpdate(id, {
            message: {
                text: text,
                delivered,
                read: readText
            },
            users,
            sender: sender_id,
            read
        })
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
}
module.exports = {
    postAddMessage,
    deleteMessage,
    putMessage,
    getMeagesSenderUser,
    getMeagesReqestUser
}