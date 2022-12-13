const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/rosters', require('./roster'));
router.use('/stats', require('./stats'));
router.use('/injury', require('./injury'));
router.use('/schedule', require('./schedule'));

module.exports = router;
