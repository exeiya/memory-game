const decksRouter = require("express").Router();
const Deck = require("../models/deck");

decksRouter.get("/", (request, response) => {
  Deck.find({}).then(decks => {
    response.json(decks)
  })
})

decksRouter.get("/:id", (request, response) => {
  Deck.findById(request.params.id).then(deck => {
    if (deck) {
      response.json(deck)
    } else {
      response.status(404).end()
    }
  }).catch(err => console.log(err))
})

module.exports = decksRouter;