const User = require('../models/user');
const handlErr = require('../utils/handlErr');
var sharp = require('sharp');
var fs = require('fs');
var path = require('path');

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
        .limit(20)
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

const  putUser = async(req, res) => {
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
        email,
        password,
        name,
        surname,
        sex,
        age,
        status,
        aboutMe,
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