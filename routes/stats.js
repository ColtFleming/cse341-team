const express = require('express');
const router = express.Router();

const statsController = require('../controllers/stats');
const validation = require('../middleware/validate');

router.get('/', statsController.getAll);

router.get('/:id', statsController.getSingle);

router.post('/', validation.saveTeamStats, statsController.createStats);

router.put('/:id', validation.saveTeamStats, statsController.updateStats);

router.delete('/:id', statsController.deleteStats);

module.exports = router;
