const express = require('express');
const router = express.Router();

const {
  getLogin,
  postRegistration
} = require('../controllers/authentication-controller');

router.post('/api/login', getLogin)
router.post('/api/registration', postRegistration);

module.exports = router;