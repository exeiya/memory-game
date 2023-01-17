import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import WinDialog from './components/WinDialog';
import GameMenuDrawer from './components/GameMenuDrawer';
import SettingsMenu from './components/SettingsMenu';
import ScoreBoard from './components/ScoreBoard';
import CardGrid from './components/CardGrid';
import WordListDialog from './components/WordListDialog';
import deckService from './services/deckService';
import UserMenu from "./components/UserMenu";
import LoginDialog from './components/LoginDialog';
import { setInitialLogin } from "./reducers/loginReducer";
import { useDispatch } from 'react-redux';

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
    words.push({ id: word.id, word: word.translationLang })
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
  const [showLogin, setShowLogin] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitialLogin())
    const fetchDecks = async () => {
      const decks = await deckService.getAll()
      setDecks(decks)
      setCurrentDeck(decks[0]["title"])
      setWords(shuffleWords(createWordPairs(decks[0]["content"])))
    }
    fetchDecks()
    setScore(0)
    const savedHighscores = JSON.parse(window.localStorage.getItem("highscores"))
    if (savedHighscores) {
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
        <UserMenu handleShowLogin={() => setShowLogin(!showLogin)} />
      </GameMenuDrawer>
      <Container style={{ maxHeight: 1000, maxWidth: 1200}}>
        <WinDialog open={gameFinished} handleNewGame={() => setNewGame(!newGame)} handleClose={() => setGameFinished(false)}/>
        <CardGrid words={words} selected={selected} found={found} handleSelect={handleSelect}/>
        <WordListDialog 
          show={showWordList} 
          close={() => setShowWordList(!showWordList)} 
          deck={decks.find(deck => deck.title === currentDeck)} />
        <LoginDialog show={showLogin} handleShow={() => setShowLogin(!showLogin)}/>
      </Container>
    </div>
  );
}

export default App;
