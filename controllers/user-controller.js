const User = require('../models/user');
const handlErr = require('../utils/handlErr');

const getUser = (req, res) => {
    User
        .findById(req.params.id, '-password -field')
        .then((event) => res.status(200).json(event))
        .catch((err) => handlErr(err.message, res.status(500)))
}

const getUsers = (req, res) => {
    User
        .find({
            /* фильтр */
        }, '-password -field')
        .sort({
            createdAt: -1
        })
        .then((events) => res.status(200).json(events))
        .catch((err) => handlErr(err.message, res.status(500)))
}

const deleteUser = (req, res) => {
    User
        .findByIdAndDelete(req.params.id)
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
}

const putUser = (req, res) => {
    const {
        email,
        password,
        name,
        surname,
        sex,
        age,
        status,
        aboutMe,
        imgAvatarId
    } = req.body;
    const {
        id
    } = req.params;
    User
        .findByIdAndUpdate(id, {
            email,
            password,
            name,
            surname,
            sex,
            age,
            status,
            aboutMe,
            imgAvatarId
        })
        .then(() => res.sendStatus(200))
        .catch((err) => handlErr(err.message, res.status(500)))
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    putUser
}