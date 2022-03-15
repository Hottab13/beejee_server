const express = require('express');
const router = express.Router();
const {
    postAddImg,
    getImg
} = require('../controllers/img-controller');
const {authenticateToken} = require('../utils/authToken');
const upload = require('../utils/multerUpload');

router.post('/api/add-img', upload.single('image'),authenticateToken, postAddImg);
router.get('/api/img/:id', upload.single('image'),authenticateToken, getImg);

module.exports = router;