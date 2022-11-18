const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db("cse341-team")
    .collection("roster")
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
      .json("Must use a valid roster id to find a member of the roster.");
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("cse341-team")
    .collection("roster")
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    });
};

const createContact = async (req, res) => {
  const rosterMember = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    position: req.body.position,
    shoots: req.body.shoots,
    height: req.body.height,
    weight: req.body.weight,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db("cse341-team")
    .collection("roster")
    .insertOne(rosterMember);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while creating the member of the roster."
      );
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid roster id to update a member of the roster.");
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const rosterMember = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    position: req.body.position,
    shoots: req.body.shoots,
    height: req.body.height,
    weight: req.body.weight,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db("cse341-team")
    .collection("roster")
    .replaceOne({ _id: userId }, rosterMember);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while updating the member of the roster."
      );
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid roster id to delete a member of the roster.");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("cse341-team")
    .collection("roster")
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while deleting the member of the roster."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
