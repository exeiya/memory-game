const mongoose = require("mongoose")
const { Schema } = mongoose;

const wordSchema = new Schema({
  targetLang: String, 
  translationLang: String 
});

const deckSchema = new Schema({
  title: String,
  date: Date,
  language: { targetLang: String, translationLang: String },
  content: [wordSchema],
});

deckSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    returnedObject.content.map(word => {
      word.id = word._id;
      delete word._id;
      return word
    })
  }
});

module.exports = mongoose.model("Deck", deckSchema);