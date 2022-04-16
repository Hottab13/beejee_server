const express = require('express');
const router = express.Router();
const {
  getUser,
  getUsers,
  deleteUser,
  putUser
} = require('../controllers/user-controller');
const {authenticateToken} = require('../utils/authToken');
const upload = require('../utils/multerUpload');

router.get('/api/users', authenticateToken, getUsers);
router.get('/api/user/:id', authenticateToken, getUser);
router.delete('/api/user/:id', authenticateToken, deleteUser);
router.put('/api/edit-user/:id',upload.single('image',), authenticateToken, putUser);

module.exports = router;