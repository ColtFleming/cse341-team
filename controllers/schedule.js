const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db('cse341-team')
    .collection('schedule')
    .find()
    .toArray((err, list) => {
      if (err) {
        res.status(400).json({ message: err });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(list);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id');
    return;
  }
  const gameId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('cse341-team')
    .collection('schedule')
    .find({ _id: gameId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const addGame = async (req, res) => {
  const jsonBody = req.body;
  if (!jsonBody['date'] || !jsonBody['opponent'] || !jsonBody['location']) {
    res.status(400);
    res.send('date, opponent, and location fields are all required.');
    return;
  }

  const newGame = {
    date: req.body.date,
    opponent: req.body.opponent,
    city: req.body.location.city,
    state: req.body.location.state
  };
};
const response = await mongodb.getDb().db('cse341-team').collection('schedule').insertOne(newGame);

if (response.acknowledged) {
  res.status(201).json(response);
} else {
  res.status(500).json(response.error || 'Some error occurred while adding new game.');
}

const updateGame = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must include a valid game id');
    return;
  }
  const gameId = new ObjectId(req.params.id);
  const game = {
    date: req.body.date,
    opponent: req.body.opponent,
    city: req.body.location.city,
    state: req.body.location.state
  };
  const response = await mongodb
    .getDb()
    .db('cse341-team')
    .collection('schedule')
    .replaceOne({ _id: gameId }, game);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating game.');
  }
};

const deleteGame = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid game id');
  }
  const gameId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('cse341-team')
    .collection('schedule')
    .deleteOne({ _id: gameId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the game.');
  }
};

module.exports = {
  getAll,
  getSingle,
  addGame,
  updateGame,
  deleteGame
};
