const express = require('express');
const router = express.Router();
const authorizationRoutes = require('./authorization');
const rosterRoutes = require('./roster');
const injuryRoutes = require('./injury');
const scheduleRoutes = require('./schedule');
const favoriteRoutes = require('./favorite');

router.use('/', require('./swagger'));

router.use('/rosters', rosterRoutes);
router.use('/injury', injuryRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/authorization', authorizationRoutes);
router.use('/favorite', favoriteRoutes);

module.exports = router;
