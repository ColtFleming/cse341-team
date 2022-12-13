const { Schema, model } = require('mongoose');
const PlayerSchema = require('./playerSchema');

const userSchema = new Schema({
  identifier: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  locale: { type: String, required: true },
  picture: { type: String },
  favoritePlayer: [PlayerSchema]
});

module.exports = model('User', userSchema);
