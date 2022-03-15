const express = require('express');
const router = express.Router();
const {
    getEvent,
    getEvents,
    postAddEvent,
    deleteEvent,
    putEvent,
    getEventsUser
} = require('../controllers/event-controller');
const {authenticateToken} = require('../utils/authToken');

router.get('/api/event/:id', getEvent);
router.get('/api/events-user/:id', getEventsUser);
router.get('/api/events', getEvents);
router.post('/api/add-event', authenticateToken, postAddEvent);
router.delete('/api/event/:id', authenticateToken, deleteEvent);
router.put('/api/edit-event/:id', authenticateToken, putEvent);

module.exports = router;