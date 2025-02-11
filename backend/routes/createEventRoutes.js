const express = require('express');
const { createEvent } = require('../controllers/createEvent');
const { getEvents } = require('../controllers/getEvents');

const router = express.Router();

router.post('/createEvent', createEvent)
router.get('/getEvents', getEvents)

module.exports = router;