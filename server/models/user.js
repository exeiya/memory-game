const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  passwordHash: String,
  highscores: [],
  decks: [],
})


module.exports = mongoose.model("User", userSchema)