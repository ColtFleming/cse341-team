const express = require('express');
const router = express.Router();
const authorizationRoutes = require('./authorization');

router.use('/', require('./swagger'));
router.use('/rosters', require('./roster'));
router.use('/injury', require('./injury'));
router.use('/schedule', require('./schedule'));
router.use('/authorization', authorizationRoutes);

module.exports = router;
