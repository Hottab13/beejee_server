const express = require('express');
const router = express.Router();
const {
    getEvent,
    getEvents,
    postAddEvent,
    deleteEvent,
    putEvent,
    getEventsUser,
    ubdateMembersEvent,
    filtrEvent
} = require('../controllers/event-controller');
const {authenticateToken} = require('../utils/authToken');
const upload = require('../utils/multerUpload');

router.get('/api/event/:id', getEvent);
router.get('/api/events-user/:id', getEventsUser);
router.get('/api/events', getEvents);
router.post('/api/add-event',upload.single('image'), authenticateToken, postAddEvent);
router.delete('/api/event/:id', authenticateToken, deleteEvent);
router.put('/api/edit-event/:id',upload.single('image'), authenticateToken, putEvent);
router.put('/api/ubdate-member-event/:id',upload.single('image'), authenticateToken, ubdateMembersEvent);
router.post('/api/filtr-events',upload.single('image'), filtrEvent);

module.exports = router;