import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer"
import WordCard from './WordCard';
import WinDialog from './WinDialog';
import SettingsMenu from './SettingsMenu';
import { useState, useEffect } from 'react';

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

function App() {
  const [selected, setSelected] = useState([]); 
  const [found, setFound] = useState([]);
  const [words, setWords] = useState([]);
  const [gameFinished, setGameFinished] = useState(false)
  const [newGame, setNewGame] = useState(false)

  useEffect(() => {
    let wordList = [];
    wordPairs.forEach((v, i) => {
      wordList.push({ id: v.id, word: v.targetLang })
      wordList.push({ id: v.id, word: v.translation })
    })
    wordList = shuffleWords(wordList)
    setWords(wordList)
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
    }
  }, [words, newGame])

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

  const handleSelect = (item) => {
    const currSelected = [...selected, item]
    console.log('clicked', item)
    if (currSelected.length < 2) {
      setSelected(currSelected)
    } else if (currSelected.length === 2) {
      setSelected(currSelected)
      if (currSelected[0].id === currSelected[1].id) {
        const currFound = [...found, currSelected[0], currSelected[1]]
        setFound(currFound)
        if (currFound.length === words.length) {
          console.log("all pairs found!")
          setGameFinished(true)
        }
      }
      setTimeout(() => setSelected([]), 700)
    }
  }

  const cardItems = () => words.reduce((prev, curr) => {
    prev.push(
      <WordCard 
        word={curr.word} 
        isSelected={selected.find(elem => elem.word === curr.word) ? true : false}
        isFound={found.find(elem => elem.word === curr.word) ? true : false}
        handleSelect={() => handleSelect(curr)}
      />)
    return prev
  }, []).map((v, i) => <Grid key={i} item md={2}>{v}</Grid>)

  return (
    <div className="App">
      <Drawer variant="permanent" anchor="left" sx={{
        width: "250px",
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: "250px",
          boxSizing: 'border-box',
        },
      }}>
        <SettingsMenu />
      </Drawer>
      <Container style={{ maxHeight: 700, maxWidth: 900}}>
        <WinDialog open={gameFinished} handleNewGame={() => setNewGame(!newGame)} handleClose={() => setGameFinished(false)}/>
        <Grid sx={{height: 720}} container columns={{ md: 10 }} spacing={0.5} justifyContent="space-evenly" alignItems="center">
          {cardItems()}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
