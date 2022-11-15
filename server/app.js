const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")
const decksRouter = require("./controllers/decks")

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

app.use(express.static(path.resolve(__dirname, "./client/build")))

app.use("/api/decks", decksRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

module.exports = app