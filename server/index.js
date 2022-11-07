require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

const decks = [
  { id: 1,
    title: "Pets",
    content: [{ id: "1", targetLang: "반려동물", translation: "a pet" },
  { id: "2", targetLang: "강아지", translation: "a puppy" },
  { id: "3", targetLang: "고양이", translation: "a cat" },
  { id: "4", targetLang: "물고기", translation: "a fish" },
  { id: "5", targetLang: "토끼", translation: "a rabbit" },
  { id: "6", targetLang: "새", translation: "a bird" },
  { id: "7", targetLang: "개", translation: "a dog" },
  { id: "8", targetLang: "햄스터", translation: "a hamster" }]
  },
  { id: 2,
    title: "Colors",
    content: [{ id: "1", targetLang: "주황색", translation: "orange" },
    { id: "2", targetLang: "노란색", translation: "yellow" },
    { id: "3", targetLang: "파란색", translation: "blue" },
    { id: "4", targetLang: "빨간색", translation: "red" },
    { id: "5", targetLang: "초록색", translation: "green" },
    { id: "6", targetLang: "검정색", translation: "black" },
    { id: "7", targetLang: "분홍색", translation: "pink" },
    { id: "8", targetLang: "보라색", translation: "purple" },
    { id: "9", targetLang: "갈색", translation: "brown" },
    { id: "10", targetLang: "흰색", translation: "white" },
    { id: "11", targetLang: "색깔", translation: "color" }]
  }
]

morgan.token("body", (req) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :response-time ms - :res[content-length] :body"))

app.get("/api/decks", (request, response) => {
  response.json(decks)
})

app.get("/api/decks/:id", (request, response) => {
  const id = Number(request.params.id)
  const deck = decks.find(deck => deck.id === id)

  if (deck) {
    response.json(deck)
  } else {
    response.status(404).end()
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})