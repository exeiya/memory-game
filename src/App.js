import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import WinDialog from './components/WinDialog';
import GameMenuDrawer from './components/GameMenuDrawer';
import SettingsMenu from './components/SettingsMenu';
import ScoreBoard from './components/ScoreBoard';
import CardGrid from './components/CardGrid';
import WordListDialog from './components/WordListDialog';

const wordDecks = [
  { title: "Pets",
    content: [{ id: "1", targetLang: "반려동물", translation: "a pet" },
  { id: "2", targetLang: "강아지", translation: "a puppy" },
  { id: "3", targetLang: "고양이", translation: "a cat" },
  { id: "4", targetLang: "물고기", translation: "a fish" },
  { id: "5", targetLang: "토끼", translation: "a rabbit" },
  { id: "6", targetLang: "새", translation: "a bird" },
  { id: "7", targetLang: "개", translation: "a dog" },
  { id: "8", targetLang: "햄스터", translation: "a hamster" }]
  },
  { title: "Colors",
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

const shuffleWords = (array) => {
  let arr = [...array]
  let remainingWordsAmount = arr.length
  let unshuffledWord, currentLastWord

  while (remainingWordsAmount) {
    unshuffledWord = Math.floor(Math.random() * remainingWordsAmount--)
    currentLastWord = arr[remainingWordsAmount]
    arr[remainingWordsAmount] = arr[unshuffledWord]
    arr[unshuffledWord] = currentLastWord
  }

  return arr
}

const createWordPairs = (deckWords) => {
  let words = []
  deckWords.forEach(word => {
    words.push({ id: word.id, word: word.targetLang })
    words.push({ id: word.id, word: word.translation })
  })
  return words
}

function App() {
  const [selected, setSelected] = useState([]); 
  const [found, setFound] = useState([]);
  const [words, setWords] = useState([]);
  const [gameFinished, setGameFinished] = useState(false)
  const [newGame, setNewGame] = useState(false)
  const [score, setScore] = useState(0)
  const [highscores, setHighscores] = useState()
  const [decks, setDecks] = useState([])
  const [currentDeck, setCurrentDeck] = useState()
  const [showWordList, setShowWordList] = useState(false)

  useEffect(() => {
    setDecks(wordDecks)
    setCurrentDeck(wordDecks[0]["title"])
    const wordList = shuffleWords(createWordPairs(wordDecks[0]["content"]))
    setWords(wordList)
    setScore(0)
    const savedHighscores = JSON.parse(window.localStorage.getItem("highscores"))
    if (savedHighscores) {
      console.log(savedHighscores)
      setHighscores(savedHighscores)
    }
  }, [])

  useEffect(() => {
    if (newGame) {
      setTimeout(() => {
        setWords(shuffleWords(words))
      }, 400)
      setNewGame(false)
      setSelected([])
      setFound([])
      setGameFinished(false)
      setScore(0)
    }
  }, [words, newGame])

  const checkHighscore = (newScore) => {
    const deckHighscore = highscores ? highscores[currentDeck] : null
    if (!deckHighscore || (newScore < deckHighscore)) {
      const newHighscores = { ...highscores, [currentDeck]: newScore }
      setHighscores(newHighscores)
      window.localStorage.setItem("highscores", JSON.stringify(newHighscores))
    }
  }

  const handleSelect = (item) => {
    const currSelected = [...selected, item]
    const newScore = score + 1
    console.log('clicked', item)
    if (currSelected.length < 2) {
      setSelected(currSelected)
      setScore(newScore)
    } else if (currSelected.length === 2) {
      setSelected(currSelected)
      setScore(newScore)
      if (currSelected[0].id === currSelected[1].id) {
        const currFound = [...found, currSelected[0], currSelected[1]]
        setFound(currFound)
        if (currFound.length === words.length) {
          console.log("all pairs found!")
          setGameFinished(true)
          checkHighscore(newScore)
        }
      }
      setTimeout(() => setSelected([]), 700)
    }
  }

  const handleDeckChange = (deck) => {
    setCurrentDeck(deck)
    const wordList = createWordPairs(decks.find(d => d.title === deck).content)
    setWords(wordList)
    setNewGame(!newGame)
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <GameMenuDrawer setNewGame={() => setNewGame(!newGame)}>
        <ScoreBoard score={score} highscore={highscores ? highscores[currentDeck] : 0} />
        <SettingsMenu 
          deckTitles={decks.map(d => d.title)}  
          currentDeck={currentDeck} 
          handleDeckChange={(event) => handleDeckChange(event.target.value)} 
          showWords={() => setShowWordList(!showWordList)} />
      </GameMenuDrawer>
      <Container style={{ maxHeight: 1000, maxWidth: 1200}}>
        <WinDialog open={gameFinished} handleNewGame={() => setNewGame(!newGame)} handleClose={() => setGameFinished(false)}/>
        <CardGrid words={words} selected={selected} found={found} handleSelect={handleSelect}/>
        <WordListDialog 
          show={showWordList} 
          close={() => setShowWordList(!showWordList)} 
          deck={decks.find(deck => deck.title === currentDeck)} />
      </Container>
    </div>
  );
}

export default App;
