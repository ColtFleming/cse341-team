const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db("cse341-team")
    .collection("stats")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid stats id to find a certain stat.");
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("cse341-team")
    .collection("stats")
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    });
};

const createStats = async (req, res) => {
  const teamStats = {
    teamName: req.body.team_name,
    goalsFor: req.body.goals_for,
    goalsAgainst: req.body.goals_against,
    wins: req.body.wins,
    losses: req.body.losses,
    overtimeLosses: req.body.overtime_losses,
    pointTotal: req.body.point_total,
  };
  const response = await mongodb
    .getDb()
    .db("cse341-team")
    .collection("stats")
    .insertOne(teamStats);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while creating the team stats."
      );
  }
};

const updateStats = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid team stat id to update.");
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const teamStats = {
    teamName: req.body.team_name,
    goalsFor: req.body.goals_for,
    goalsAgainst: req.body.goals_against,
    wins: req.body.wins,
    losses: req.body.losses,
    overtimeLosses: req.body.overtime_losses,
    pointTotal: req.body.point_total,
  };
  const response = await mongodb
    .getDb()
    .db("cse341-team")
    .collection("stats")
    .replaceOne({ _id: userId }, teamStats);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while updating the team stats."
      );
  }
};

const deleteStats = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid team stat id to delete team stats.");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("cse341-team")
    .collection("stats")
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while deleting the team stats."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createStats,
  updateStats,
  deleteStats,
};
