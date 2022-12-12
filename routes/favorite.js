const { Router } = require('express');
const PlayerController = require('../controllers/player.controller');
const loadUser = require('../middleware/loadUser');

const router = Router();

router.use([loadUser]);

router.get('/', PlayerController.index);
router.post('/', PlayerController.create);

module.exports = router;
