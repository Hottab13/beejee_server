const express = require('express');
const router = express.Router();
const upload = require('../utils/multerUpload');

const {
  getLogin,
  postRegistration,
  getToken
} = require('../controllers/authentication-controller');

router.post('/api/login',upload.single('image'), getLogin)
router.get('/api/token', getToken)
router.post('/api/registration',upload.single('image'), postRegistration);

module.exports = router;