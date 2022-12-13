const express = require('express');
const router = express.Router();

const injuryController = require('../controllers/injury');

/*****************************************************
 * GET
 ******************************************************/
// read all
router.get('/', injuryController.getAll);

// read by specific filter
router.get('/:id', injuryController.getByID);
router.get('/injury/:injury', injuryController.getByInjury);
router.get('/length/:length', injuryController.getByLength);

/*****************************************************
 * POST
 ******************************************************/
// create
router.post('/', injuryController.createInjuryReserve);

/*****************************************************
 * PUT
 ******************************************************/
// update by ID
router.put('/:id', injuryController.updateInjuryReserve);

/*****************************************************
 * DELETE
 ******************************************************/
// delete by ID
router.delete('/:id', injuryController.deleteInjuryReserve);

module.exports = router;
