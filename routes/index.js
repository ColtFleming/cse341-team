const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/rosters', require('./roster'));

module.exports = router;
