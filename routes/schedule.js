const express = require('express');
const router = express.Router();

const schedulesController = require('../controllers/schedule');
const validation = require('../middleware/validate');

router.get('/', schedulesController.getAll);

router.get('/:id', schedulesController.getSingle);

router.post('/', validation.saveGame, schedulesController.addGame);

router.put('/:id', validation.saveGame, schedulesController.updateGame);

router.delete('/:id', schedulesController.deleteGame);

module.exports = router;
