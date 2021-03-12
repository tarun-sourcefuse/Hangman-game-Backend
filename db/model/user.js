const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  currentGame: { type: Schema.Types.ObjectId, ref: "Game" },
});

userSchema.plugin(uniqueValidator, { message: "Email must be unique." });

let User = mongoose.model("User", userSchema);
module.exports = User;
