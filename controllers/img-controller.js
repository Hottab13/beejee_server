const ImgModel = require('../models/image');
const handlErr = require('../utils/handlErr');
var fs = require('fs');
var path = require('path');

const getImg = (req, res) => {
    ImgModel
        .findById(req.params.id)
        .then((img) => res.status(200).json(img))
        .catch((err) => handlErr(err.message, res.status(500)))
}

const postAddImg = (req, res) => {
    const img = new ImgModel({
        img: {
            data: fs.readFileSync(path.join(__dirname, '../uploads', req.file.filename)),
            contentType: 'image/png'
        }
    })
    img.save()
        .then((result) => {
            const resId = {
                idImg: result._id
            }
            res.status(200).json(resId)
        })
        .catch((err) => handlErr(err.message, res.status(500)));
}
module.exports = {
    postAddImg,
    getImg
}