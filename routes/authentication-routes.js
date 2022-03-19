const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
  getLogin,
  postRegistration
} = require('../controllers/authentication-controller');

router.post('/api/login',cors(), getLogin)
router.post('/api/registration', postRegistration);

module.exports = router;