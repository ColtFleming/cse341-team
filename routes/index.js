const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/rosters', require('./roster'));
router.use('/stats', require('./stats'));

module.exports = router;
