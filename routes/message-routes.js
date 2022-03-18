const express = require('express');
const router = express.Router();
const {
  postAddMessage,
  deleteMessage,
  putMessage,
  getMeagesSenderUser,
  getMeagesReqestUser
} = require('../controllers/message-controller');
const {authenticateToken} = require('../utils/authToken');

router.get('/api/meages-req/:id', authenticateToken, getMeagesReqestUser);
router.get('/api/meages-sender/:id', authenticateToken, getMeagesSenderUser);
router.post('/api/add-message', authenticateToken, postAddMessage);
router.delete('/api/message/:id', authenticateToken, deleteMessage);
router.put('/api/edit-message/:id', authenticateToken, putMessage);

module.exports = router;