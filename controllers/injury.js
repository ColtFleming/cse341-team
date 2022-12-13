const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/**
 * #swagger.description = 'Get all injuries'
 */
const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db('cse341-team')
    .collection('ir')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

/**
 * #swagger.description = 'Get injury by ID'
 */
const getByID = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid injury id to find a injury.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('cse341-team')
    .collection('ir')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

/**
 * #swagger.description = 'Get injury by injury'
 */
const getByInjury = async (req, res) => {
  const userInjury = req.params.injury;
  mongodb
    .getDb()
    .db('cse341-team')
    .collection('ir')
    .find({ injury: userInjury })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      if (result.length === 0) {
        return res.status(404).json({ err: `No player is currently out with ${userInjury}!` });
      }
      res.status(200).json(result[0]);
    });
};

/**
 * #swagger.description = 'Get injury by length'
 */
const getByLength = async (req, res) => {
  const userLength = req.params.length;
  mongodb
    .getDb()
    .db('cse341-team')
    .collection('ir')
    .find({ length: userLength })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      if (result.length === 0) {
        return res.status(404).json({ err: `No player has with that length of injury` });
      }
      res.status(200).json(result[0]);
    });
};

/**
 * #swagger.description = 'create injury'
 */
const createInjuryReserve = async (req, res) => {
  const newInjury = {
    name: req.body.name,
    injury: req.body.injury,
    length: req.body.length
  };
  const response = await mongodb.getDb().db('cse341-team').collection('ir').insertOne(newInjury);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the injury entry.');
  }
};

/**
 * #swagger.description = 'update injury by id'
 */
const updateInjuryReserve = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid injury id to update an injury.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const newInjury = {
    name: req.body.name,
    injury: req.body.injury,
    length: req.body.length
  };
  const response = await mongodb
    .getDb()
    .db('cse341-team')
    .collection('ir')
    .replaceOne({ _id: userId }, newInjury);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the injury entry.');
  }
};

/**
 * #swagger.description = 'delete injury by id'
 */
const deleteInjuryReserve = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid injury id to update an injury.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('cse341-team')
    .collection('ir')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the injury.');
  }
};

module.exports = {
  getAll,
  getByID,
  getByInjury,
  getByLength,
  createInjuryReserve,
  updateInjuryReserve,
  deleteInjuryReserve
};
