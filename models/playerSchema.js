const { Schema, model } = require('mongoose');

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  number: { type: [Number], required: true },
  position: { type: String, required: true }
});

module.exports = PlayerSchema;
