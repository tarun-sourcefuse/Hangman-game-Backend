const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  word: { type: String, required: true },
  hint: { type: String, required: true },
  attempts: { type: Number, default: 6 },
  guessWords: { type: Array, default: [] },
  correctWords: { type: Array, default: [] },
});

let Game = mongoose.model("Game", gameSchema);
module.exports = Game;
