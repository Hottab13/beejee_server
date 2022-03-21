const express = require('express');
const router = express.Router();

const {
  getLogin,
  postRegistration,
  getToken
} = require('../controllers/authentication-controller');

router.post('/api/login', getLogin)
router.get('/api/token', getToken)
router.post('/api/registration', postRegistration);

module.exports = router;