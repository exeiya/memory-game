require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const Deck = require("./models/deck")

morgan.token("body", (req) => JSON.stringify(req.body))

mongoose.connect(process.env.MONGODB_URI)
  .then(res => {
    console.log("Connected to db")
  }).catch(err => {
    console.log("Error while connecting to db: ", err)
  })

app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :response-time ms - :res[content-length] :body"))
app.use(express.static("build"))

app.get("/api/decks", (request, response) => {
  Deck.find({}).then(decks => {
    response.json(decks)
  })
})

app.get("/api/decks/:id", (request, response) => {
  Deck.findById(request.params.id).then(deck => {
    if (deck) {
      response.json(deck)
    } else {
      response.status(404).end()
    }
  }).catch(err => console.log(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})