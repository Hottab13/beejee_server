const ImgModel = require('../models/image');
const handlErr = require('../utils/handlErr');
var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

const getImg = (req, res) => {
    ImgModel
        .findById(req.params.id)
        .then((img) => {
            res.status(200).json(img)
            //fs.unlinkSync(path.join(__dirname, '../uploads', req.file.filename))
        })
        .catch((err) => handlErr(err.message, res.status(500)))
}

const postAddImg = (req, res) => {
    sharp(path.join(__dirname, '../uploads', req.file.filename)).resize(48, 48)
        .jpeg({
            quality: 50
        }).toFile(path.join(__dirname, '../uploads',
            '/avatar_thumb.jpg'));

    sharp(path.join(__dirname, '../uploads', req.file.filename)).resize(1000, 1000)
        .jpeg({
            quality: 80
        }).toFile(path.join(__dirname, '../uploads',
            '/avatar_preview.jpg'));

    const img = new ImgModel({
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
    })
    img.save()
        .then((result) => {
            const resId = {
                idImg: result._id
            }
            res.status(200).json(resId)
            fs.unlinkSync(path.join(__dirname, '../uploads', req.file.filename))
        })
        .catch((err) => handlErr(err.message, res.status(500)));
}
module.exports = {
    postAddImg,
    getImg
}