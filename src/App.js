import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import WinDialog from './components/WinDialog';
import bgpicture from './assets/tic-tac-toe.png';
import GameMenuDrawer from './components/GameMenuDrawer';
import CardGrid from './components/CardGrid';

const wordPairs = [
  { id: "1", targetLang: "반려동물", translation: "a pet" },
  { id: "2", targetLang: "강아지", translation: "a puppy" },
  { id: "3", targetLang: "고양이", translation: "a cat" },
  { id: "4", targetLang: "물고기", translation: "a fish" },
  { id: "5", targetLang: "토끼", translation: "a rabbit" },
  { id: "6", targetLang: "새", translation: "a bird" },
  { id: "7", targetLang: "개", translation: "a dog" },
  { id: "8", targetLang: "햄스터", translation: "a hamster" },
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

function App() {
  const [selected, setSelected] = useState([]); 
  const [found, setFound] = useState([]);
  const [words, setWords] = useState([]);
  const [gameFinished, setGameFinished] = useState(false)
  const [newGame, setNewGame] = useState(false)
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState()

  useEffect(() => {
    let wordList = [];
    wordPairs.forEach((v, i) => {
      wordList.push({ id: v.id, word: v.targetLang })
      wordList.push({ id: v.id, word: v.translation })
    })
    wordList = shuffleWords(wordList)
    setWords(wordList)
    setScore(0)
    const existingHighscore = window.localStorage.getItem('highscore')
    if (existingHighscore) {
      setHighscore(parseInt(existingHighscore))
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
          if (!highscore || (newScore < highscore)) {
            setHighscore(newScore)
            window.localStorage.setItem("highscore", newScore)
          }
        }
      }
      setTimeout(() => setSelected([]), 700)
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${bgpicture})`, height:'100vh', display: "flex"}}>
      <GameMenuDrawer setNewGame={() => setNewGame(!newGame)} score={score} highscore={highscore} />
      <Container style={{ maxHeight: 1000, maxWidth: 1200}}>
        <WinDialog open={gameFinished} handleNewGame={() => setNewGame(!newGame)} handleClose={() => setGameFinished(false)}/>
        <CardGrid words={words} selected={selected} found={found} handleSelect={handleSelect}/>
      </Container>
    </div>
  );
}

export default App;
